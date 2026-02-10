import { LearnerState, DemoScenario, DemoAction, JourneyPhase } from "./types";
import { SeededRNG } from "./seeded-rng";

export class DemoEngine {
    private state: LearnerState;
    private rng: SeededRNG;
    private scenario: DemoScenario;
    private listeners: ((state: LearnerState) => void)[] = [];

    constructor(scenario: DemoScenario, seed: string = "DEMO_2026") {
        this.scenario = scenario;
        this.rng = new SeededRNG(seed);
        this.state = this.initializeState(scenario, seed);
    }

    private initializeState(scenario: DemoScenario, seed: string): LearnerState {
        const baseState: LearnerState = {
            seed,
            name: "Öğrenci",
            role: "student",
            cohort: "Genel",
            avatarUrl: "/avatars/default.png",
            sdg: 0,
            phase: "onboarding",
            level: "cirak",
            xp: 0,
            streak: 0,
            gdrScore: 0,
            gdrComponents: { teknik_rol: 0, takim: 0, sunum: 0, guvenilirlik: 0, sosyal_etki: 0 },
            completedMicrolabs: [],
            completedTasks: [],
            collectedBadges: [],
            simulation: {
                activeScenarioId: null,
                status: "idle",
                score: 0,
            },
            inventory: [],
            notifications: [],
        };

        return { ...baseState, ...scenario.initialState };
    }

    public getState(): LearnerState {
        return { ...this.state };
    }

    public dispatch(action: DemoAction) {
        const previousState = { ...this.state };

        switch (action.type) {
            case "COMPLETE_MICROLAB":
                if (!this.state.completedMicrolabs.includes(action.payload.id)) {
                    this.state.completedMicrolabs.push(action.payload.id);
                    this.state.xp += action.payload.xp;
                    this.addNotification({
                        title: "MicroLab Tamamlandı",
                        message: `Tebrikler! ${action.payload.xp} XP kazandın.`,
                        type: "success",
                    });
                }
                break;

            case "SUBMIT_TASK":
                if (!this.state.completedTasks.includes(action.payload.id)) {
                    this.state.completedTasks.push(action.payload.id);
                    this.state.xp += action.payload.xp;
                    this.addNotification({
                        title: "Görev Teslim Edildi",
                        message: `Harika iş! Görevin incelemeye alındı.`,
                        type: "info",
                    });
                }
                break;

            case "ATTEND_EVENT":
                this.state.xp += action.payload.xp;
                this.addNotification({
                    title: "Etkinliğe Katıldın",
                    message: `Fiziksel merkezde check-in yapıldı. +${action.payload.xp} XP`,
                    type: "success"
                });
                break;

            case "ADVANCE_PHASE":
                this.state.phase = action.payload.phase;
                this.addNotification({
                    title: "Yeni Faz Kilidi Açıldı",
                    message: `${this.getPhaseName(action.payload.phase)} fazına hoşgeldin!`,
                    type: "success"
                });
                break;

            case "START_SIMULATION":
                this.state.simulation.activeScenarioId = action.payload.id;
                this.state.simulation.status = "running";
                this.state.simulation.score = 0;
                break;

            case "COMPLETE_SIMULATION":
                if (this.state.simulation.activeScenarioId === action.payload.id) {
                    this.state.simulation.status = "completed";
                    this.state.simulation.score = action.payload.score;
                    this.state.xp += action.payload.xp;
                    this.addNotification({
                        title: "Simülasyon Tamamlandı",
                        message: `Sürdürülebilirlik hedefine ulaştın! +${action.payload.xp} XP`,
                        type: "success"
                    });
                }
                break;

            case "MANUAL_LEVEL_UP":
                this.state.level = action.payload.level as any;
                this.addNotification({
                    title: "Seviye Atladın!",
                    message: `${action.payload.level.toUpperCase()} seviyesine yükseldin.`,
                    type: "success"
                });
                break;

            case "JUMP_TO_STAGE":
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { DEMO_STAGES } = require("../demo-data");
                const stageData = DEMO_STAGES[action.payload.stage];
                if (stageData) {
                    const u = stageData.user;
                    this.state = {
                        ...this.state,
                        name: u.name,
                        role: u.role,
                        level: u.level,
                        xp: u.xp,
                        streak: u.streak,
                        cohort: u.cohort,
                        sdg: u.sdg,
                        gdrScore: u.gdrScore,
                        gdrComponents: u.gdrComponents,
                        // Update phase based on level/stage if needed, or mapping
                    };

                    // Simple phase mapping
                    if (action.payload.stage === "onboarding") this.state.phase = "onboarding";
                    else if (action.payload.stage === "graduation") this.state.phase = "graduation";
                    // else keep current or refine logic
                }
                break;
        }

        this.checkLevelUp(previousState.xp);
        this.notifyListeners();
    }

    private checkLevelUp(previousXp: number) {
        // Simple XP Thresholds
        const THRESHOLDS = {
            kalfa: 1000,
            usta: 2500,
            graduate: 5000,
        };

        if (this.state.xp >= THRESHOLDS.graduate && this.state.level !== "graduate") {
            this.state.level = "graduate";
            this.state.phase = "graduation";
            this.addNotification({ title: "MEZUN OLDUN! 🎓", message: "Yolculuğun zirvesine ulaştın.", type: "success" });
        } else if (this.state.xp >= THRESHOLDS.usta && this.state.level !== "usta" && this.state.level !== "graduate") {
            this.state.level = "usta";
            this.addNotification({ title: "USTA Seviyesine Yükseldin", message: "Artık liderlik edebilirsin.", type: "success" });
        } else if (this.state.xp >= THRESHOLDS.kalfa && this.state.level !== "kalfa" && this.state.level !== "usta" && this.state.level !== "graduate") {
            this.state.level = "kalfa";
            this.addNotification({ title: "KALFA Seviyesine Yükseldin", message: "İnşa fazı başladı.", type: "success" });
        }
    }

    private addNotification(n: Omit<import("./types").Notification, "id" | "read" | "timestamp">) {
        const id = Math.random().toString(36).substring(7); // Simple ID
        this.state.notifications.unshift({
            id,
            ...n,
            read: false,
            timestamp: new Date().toISOString(),
        });
    }

    private getPhaseName(phase: JourneyPhase): string {
        const names: Record<JourneyPhase, string> = {
            onboarding: "Başlangıç",
            discovery: "Keşif",
            build: "İnşa",
            impact: "Etki",
            graduation: "Mezuniyet"
        };
        return names[phase];
    }

    public subscribe(listener: (state: LearnerState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this.getState()));
    }
}
