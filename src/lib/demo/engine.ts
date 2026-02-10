import { DemoState, DemoAction, JourneyPhase, OnboardingState } from "./types";

export class DemoEngine {
    private state: DemoState;
    private listeners: ((state: DemoState) => void)[] = [];

    constructor(initialState: DemoState) {
        this.state = initialState;
    }

    public getState(): DemoState {
        return { ...this.state };
    }

    public dispatch(action: DemoAction) {
        // console.log("Dispatching:", action.type, action); 

        switch (action.type) {
            // General State Updates
            case "SET_STAGE":
                // Handled via JUMP_TO_CHECKPOINT logic mostly, but kept for compatibility if needed
                break;

            case "UPDATE_USER":
                this.state = {
                    ...this.state,
                    ...action.payload,
                };
                break;

            case "ADD_NOTIFICATION":
                this.addNotification({
                    title: action.payload.title,
                    message: action.payload.message,
                    type: action.payload.type,
                });
                break;

            case "MARK_NOTIFICATION_READ":
                this.state.dashboard.notifications = this.state.dashboard.notifications.map((n) =>
                    n.id === action.payload.id ? { ...n, read: true } : n
                );
                break;

            case "ADD_XP":
                this.state.xp += action.payload.amount;
                this.checkLevelUp();
                break;

            // Phase & Simulation
            case "ADVANCE_PHASE":
                this.state.phase = action.payload.phase;
                this.addNotification({
                    title: "Yeni Faz Kilidi Açıldı",
                    message: `${this.getPhaseName(action.payload.phase)} fazına hoşgeldin!`,
                    type: "success",
                });
                break;

            case "START_SIMULATION":
                if (this.state.simulation) {
                    this.state.simulation.activeScenarioId = action.payload.id;
                    this.state.simulation.status = "running";
                    this.state.simulation.score = 0;
                }
                break;

            case "COMPLETE_SIMULATION":
                this.state.xp += action.payload.xp;
                this.state.gdrScore += 5; // Deterministic boost
                if (this.state.simulation) {
                    this.state.simulation.status = "completed";
                    this.state.simulation.score = action.payload.score;
                }
                this.addNotification({
                    title: "Simülasyon Tamamlandı",
                    message: `Sürdürülebilirlik hedefine ulaştın! +${action.payload.xp} XP`,
                    type: "success",
                });
                this.checkLevelUp();
                break;

            // V2 Deterministic Actions
            case "COMPLETE_ONBOARDING":
                this.state.onboarding = action.payload;
                this.state.phase = "discovery";
                // Set primary path as active (mock logic)
                this.addNotification({
                    title: "Yolculuk Başladı",
                    message: "Profilin oluşturuldu. İlk hedefini seç!",
                    type: "success",
                });
                break;

            case "CHECKIN_CENTER":
                this.state.center.occupancy += 1;
                this.state.center.activeCheckInId = "checkin-" + Date.now();
                this.addNotification({
                    title: "Hoşgeldin!",
                    message: `${action.payload.purpose === 'learning' ? 'Öğrenme' : 'Etkinlik'} için giriş yapıldı.`,
                    type: "success",
                });
                break;

            case "CHECKOUT_CENTER":
                if (this.state.center.occupancy > 0) this.state.center.occupancy -= 1;
                this.state.center.activeCheckInId = undefined;
                this.state.xp += 50; // Check-out bonus
                this.addNotification({
                    title: "Güle Güle!",
                    message: "Merkezden çıkış yapıldı. +50 XP",
                    type: "info",
                });
                break;

            case "REGISTER_WORKSHOP":
                if (!this.state.workshops.registeredIds.includes(action.payload.workshopId)) {
                    this.state.workshops.registeredIds.push(action.payload.workshopId);
                    this.addNotification({
                        title: "Atölye Kaydı Alındı",
                        message: "Kontenjan ayrıldı. Takvimine eklendi.",
                        type: "success",
                    });
                }
                break;

            case "COMPLETE_DAILY_REVIEW":
                this.state.dailyReview.completedToday += action.payload.reviewed;
                this.state.dailyReview.streak += 1;
                this.state.streak += 1;
                this.state.xp += action.payload.reviewed * 10;
                break;

            case "GENERATE_CERTIFICATE":
                this.state.portfolio.certificateId = "CERT-" + Math.random().toString(36).substring(2, 9).toUpperCase();
                this.addNotification({
                    title: "Sertifika Hazır",
                    message: "Mezuniyet sertifikan oluşturuldu.",
                    type: "success",
                });
                break;

            // The "Magic" Presentation Controller
            case "JUMP_TO_CHECKPOINT":
                this.hydrateCheckpoint(action.payload.id);
                break;

            // Retained for backward compatibility
            case "MANUAL_LEVEL_UP":
                this.state.level = action.payload.level as any;
                break;

            case "JUMP_TO_STAGE":
                // Legacy handler
                break;

            // Legacy Handlers
            case "COMPLETE_MICROLAB":
                if (!this.state.completedMicrolabs?.includes(action.payload.id)) {
                    this.state.completedMicrolabs = [...(this.state.completedMicrolabs || []), action.payload.id];
                    this.state.xp += action.payload.xp;
                    this.addNotification({
                        title: "MicroLab Tamamlandı",
                        message: `+${action.payload.xp} XP kazandın.`,
                        type: "success",
                    });
                    this.checkLevelUp();
                }
                break;

            case "SUBMIT_TASK":
                if (!this.state.completedTasks?.includes(action.payload.id)) {
                    this.state.completedTasks = [...(this.state.completedTasks || []), action.payload.id];
                    this.state.xp += action.payload.xp;
                    this.addNotification({
                        title: "Görev Gönderildi",
                        message: `Görevin inceleniyor. +${action.payload.xp} XP (tahmini)`,
                        type: "info",
                    });
                }
                break;

            case "ATTEND_EVENT":
                this.state.xp += action.payload.xp;
                this.addNotification({
                    title: "Etkinliğe Katıldın",
                    message: `+${action.payload.xp} XP kazandın.`,
                    type: "success",
                });
                break;

            // ─── V2 Nirvana Actions ──────────────────────────────
            case "START_MODULE":
                this.addNotification({
                    title: "Modül Başladı",
                    message: `${action.payload.moduleId} modülüne başladın.`,
                    type: "info",
                });
                break;

            case "COMPLETE_LESSON":
                this.state.xp += action.payload.score * 2;
                this.addNotification({
                    title: "Ders Tamamlandı",
                    message: `+${action.payload.score * 2} XP kazandın.`,
                    type: "success",
                });
                this.checkLevelUp();
                break;

            case "BOOK_MENTOR":
                this.addNotification({
                    title: "Mentor Randevusu",
                    message: `${action.payload.date} tarihine randevu alındı.`,
                    type: "success",
                });
                break;

            case "MARK_ATTENDANCE":
                this.state.streak += 1;
                this.state.xp += 25;
                this.addNotification({
                    title: "Yoklama Alındı",
                    message: "Bugünkü devam kaydın eklendi. +25 XP",
                    type: "info",
                });
                break;

            case "COMPLETE_CORE_MODULE":
                this.state.xp += 200;
                if (!this.state.completedMicrolabs?.includes(action.payload.moduleId)) {
                    this.state.completedMicrolabs = [
                        ...(this.state.completedMicrolabs || []),
                        action.payload.moduleId,
                    ];
                }
                this.addNotification({
                    title: "Çekirdek Modül Tamamlandı! 🎉",
                    message: `${action.payload.moduleId} başarıyla tamamlandı. +200 XP`,
                    type: "success",
                });
                this.checkLevelUp();
                break;

        }

        this.notifyListeners();
    }

    private checkLevelUp() {
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
            this.state.phase = "impact";
            this.addNotification({ title: "USTA Seviyesine Yükseldin", message: "Artık liderlik edebilirsin.", type: "success" });
        } else if (this.state.xp >= THRESHOLDS.kalfa && this.state.level !== "kalfa" && this.state.level !== "usta" && this.state.level !== "graduate") {
            this.state.level = "kalfa";
            this.state.phase = "build";
            this.addNotification({ title: "KALFA Seviyesine Yükseldin", message: "İnşa fazı başladı.", type: "success" });
        }
    }

    private addNotification(n: { title: string; message: string; type: "info" | "success" | "warning" | "error" }) {
        const id = Math.random().toString(36).substring(7);
        const notification: import("./types").Notification = {
            id,
            ...n,
            read: false,
            timestamp: new Date(),
        };
        this.state.dashboard.notifications = [notification, ...this.state.dashboard.notifications];
    }

    private getPhaseName(phase: JourneyPhase): string {
        const names: Record<JourneyPhase, string> = {
            onboarding: "Başlangıç",
            discovery: "Keşif",
            build: "İnşa",
            impact: "Etki",
            graduation: "Mezuniyet",
        };
        return names[phase] || phase;
    }

    // Deterministic State Hydration for Presentation
    private hydrateCheckpoint(sceneIndex: number) {
        // Reset base stats for specific scenes to ensure consistency
        switch (sceneIndex) {
            case 1: // Onboarding
                this.state.phase = "onboarding";
                this.state.level = "cirak";
                this.state.xp = 0;
                this.state.onboarding = { ...this.state.onboarding, primaryPath: null };
                break;
            case 2: // Dashboard (Discovery)
                this.state.phase = "discovery";
                this.state.level = "cirak";
                this.state.xp = 150;
                this.state.onboarding.primaryPath = "veri-analizi"; // Default for demo
                break;
            case 3: // Learning (MicroLab)
                this.state.phase = "discovery";
                this.state.level = "cirak";
                this.state.xp = 350;
                break;
            case 4: // Simulation (Build)
                this.state.phase = "build";
                this.state.level = "kalfa";
                this.state.xp = 1200;
                this.state.simulation = {
                    activeScenarioId: "traffic-ai",
                    status: "running",
                    score: 0
                };
                break;
            case 5: // Physical Center
                this.state.center.occupancy = 24; // Looks busy
                break;
            case 6: // Mentorship (Impact)
                this.state.phase = "impact";
                this.state.level = "usta";
                this.state.xp = 3800;
                this.state.gdrScore = 85;
                break;
            case 7: // Graduation
                this.state.phase = "graduation";
                this.state.level = "graduate";
                this.state.xp = 5500;
                this.state.gdrScore = 96;
                this.state.portfolio.certificateId = "CERT-DEMO-2026";
                break;
        }

        this.addNotification({
            title: `Sahne ${sceneIndex} Yüklendi`,
            message: "Demo durumu güncellendi.",
            type: "info"
        });
    }

    public subscribe(listener: (state: DemoState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this.getState()));
    }
}
