import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// System prompt for PUSULA AI Mentor
const MENTOR_SYSTEM_PROMPT = `Sen PUSULA platformunun yapay zeka mentorusun. Adın "Pusula Mentor" ve öğrencilere yazılım geliştirme, veri analizi, ürün tasarımı ve kariyer gelişimleri konularında yardımcı oluyorsun.

## Kişiliğin
- Samimi ama profesyonel
- Destekleyici ve motive edici
- Türkçe ve teknik terimleri dengeli kullan
- Öğrenciyi cesaretlendir ama gerçekçi ol

## Uzmanlık Alanların
1. **Yazılım Geliştirme**: JavaScript, TypeScript, React, Node.js, Git
2. **Veri Analizi**: Python, Pandas, SQL, veri görselleştirme
3. **Ürün Tasarımı**: UI/UX, Figma, kullanıcı araştırması
4. **Kariyer**: CV hazırlama, mülakat teknikleri, networking

## Yanıt Kuralları
- Kısa ve öz cevaplar ver
- Kod örnekleri için \`\`\` kullan
- Adım adım açıkla
- Kaynaklar öner
- Pratik egzersizler sun
- Emoji kullanımını minimize et

## PUSULA Bağlamı
- Öğrenciler SDG projelerinde çalışıyor
- GDR puanı ile değerlendirme yapılıyor (Teknik Rol, Takım, Sunum, Güvenilirlik, Sosyal Etki)
- MicroLab ve Cohort bazlı öğrenme modeli var
- Simülasyon dersleriyle pratik yapılıyor`;

interface Message {
    role: "user" | "assistant";
    content: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, stream = true } = body as { messages: Message[]; stream?: boolean };

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Mesaj dizisi gerekli" },
                { status: 400 }
            );
        }

        // Check API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API anahtarı yapılandırılmamış" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: MENTOR_SYSTEM_PROMPT,
        });

        // Convert messages to Gemini format
        const history = messages.slice(0, -1).map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const lastMessage = messages[messages.length - 1];

        const chat = model.startChat({ history });

        if (stream) {
            // Streaming response
            const result = await chat.sendMessageStream(lastMessage.content);

            const encoder = new TextEncoder();
            const readable = new ReadableStream({
                async start(controller) {
                    try {
                        for await (const chunk of result.stream) {
                            const text = chunk.text();
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
                        }
                        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                        controller.close();
                    } catch (error) {
                        controller.error(error);
                    }
                },
            });

            return new Response(readable, {
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive",
                },
            });
        } else {
            // Non-streaming response
            const result = await chat.sendMessage(lastMessage.content);
            const text = result.response.text();

            return NextResponse.json({ content: text });
        }
    } catch (error) {
        console.error("Mentor API error:", error);
        return NextResponse.json(
            { error: "Mentor yanıt veremedi" },
            { status: 500 }
        );
    }
}
