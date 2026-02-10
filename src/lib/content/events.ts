export interface EventContent {
    id: string;
    title: string;
    description: string;
    date: string;
    type: "meeting" | "event" | "workshop";
    location: "Online" | "Fiziksel Merkez (DiGEM)";
    xp: number;
}

export const EVENTS: EventContent[] = [
    {
        id: "evt_01",
        title: "Tanışma Toplantısı",
        description: "Kohort 4 ile tanışma ve oryantasyon.",
        date: "Pazartesi, 10:00",
        type: "meeting",
        location: "Fiziksel Merkez (DiGEM)",
        xp: 50
    },
    {
        id: "evt_02",
        title: "Hackathon: Green City Solutions",
        description: "48 saatlik maraton. Takımını kur, şehrin sorununa çözüm üret.",
        date: "15 Haziran, 09:00",
        type: "event",
        location: "Fiziksel Merkez (DiGEM)",
        xp: 500
    },
    {
        id: "evt_03",
        title: "Kariyer Günü: TechCorp",
        description: "Eskişehir Teknoloji Bölgesi'nden firmalarla mülakat simülasyonu.",
        date: "20 Haziran, 14:00",
        type: "workshop",
        location: "Online",
        xp: 100
    }
];
