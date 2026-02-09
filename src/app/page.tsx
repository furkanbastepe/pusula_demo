"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { SDGMarquee } from "@/components/blocks/sdg-marquee";
import {
  ArrowRight,
  Compass,
  Target,
  Rocket,
  BarChart3,
  Construction,
  Wrench,
  Crown,
  ChevronDown,
  Code,
  Lightbulb,
  Menu,
  CheckCircle2,
  Fingerprint,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// Journey stages with image URLs
const journey = [
  {
    level: "Çırak",
    english: "Apprentice",
    duration: "6 hafta",
    tasks: 10,
    icon: Construction,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    description: "Temel yetkinliklerin kazanıldığı, disiplin ve çalışma kültürünün aşılandığı ilk adım. Burada öğrenmeyi öğreniyorsunuz.",
    features: ["Temel Kodlama", "Algoritmik Düşünce"],
    tag: "BAŞLANGIÇ",
    tagColor: "bg-blue-500",
    accentColor: "text-blue-500",
    borderColor: "hover:border-blue-500/50",
  },
  {
    level: "Kalfa",
    english: "Journeyman",
    duration: "6 hafta",
    tasks: 15,
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    description: "Teorik bilginin pratiğe döküldüğü, gerçek dünya projelerinde rol alınan geliştirme safhası. Hata yapmaktan korkma.",
    features: ["Proje Yönetimi", "Takım Çalışması"],
    tag: "ORTA SEVİYE",
    tagColor: "bg-cyan-500",
    accentColor: "text-cyan-400",
    borderColor: "hover:border-cyan-400/50",
  },
  {
    level: "Usta",
    english: "Master",
    duration: "4 hafta",
    tasks: 15,
    icon: Crown,
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&h=600&fit=crop",
    description: "Liderlik, inovasyon ve mentorluk. Artık sadece üretmiyor, yön veriyor ve öğretiyorsunuz. Sektöre yön verme zamanı.",
    features: ["İnovasyon Liderliği", "Mentorluk"],
    tag: "İLERİ SEVİYE",
    tagColor: "bg-amber-500",
    accentColor: "text-amber-400",
    borderColor: "hover:border-amber-400",
    glow: true,
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-body antialiased overflow-x-hidden">
      {/* Sticky Navigation - Blue Theme */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Compass className="size-8 text-emerald-500 group-hover:rotate-12 transition-transform" />
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-blue-500 transition-colors">
              PUSULA
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#mission" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Vizyon
            </a>
            <a href="#mission" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Misyon
            </a>
            <a href="#model" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Model
            </a>
            <a href="#sdg" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              İletişim
            </a>
          </div>
          <Link href="/kayit">
            <Button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Kayıt Ol
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <button className="md:hidden text-white">
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION - Cinematic Full Screen */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale, opacity: heroOpacity }}>
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
            alt="Modern tech workspace"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-emerald-600/10 to-[#0a0a0a]" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Main Title */}
          <h1 className="font-display font-black text-6xl md:text-8xl tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
            GELECEĞİNE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-500 to-white">
              YÖN VER
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mt-4 font-light leading-relaxed">
            Eskişehir DİGEM'in kalbinde, teknoloji ve inovasyonla harmanlanmış yeni nesil hibrit eğitim deneyimi.
          </p>

          {/* Scroll Indicator */}
          <div className="mt-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-xs text-slate-400 tracking-widest uppercase">Keşfetmek için kaydır</span>
            <ChevronDown className="size-5 text-white/50" />
          </div>
        </motion.div>
      </section>

      {/* 2. MISSION SECTION - Parallax Cards */}
      <section className="relative py-32 bg-[#0a0a0a] overflow-hidden" id="mission">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Content Stack */}
            <motion.div
              className="flex flex-col gap-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Problem */}
              <div className="group relative pl-8 border-l-2 border-white/10 hover:border-emerald-500 transition-colors duration-500">
                <div className="absolute -left-[11px] top-0 p-1 bg-[#0a0a0a]">
                  <Target className="size-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors">
                  Problem
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Geleneksel eğitim modelleri, hızla değişen teknoloji dünyasının gereksinimlerine ayak uyduramıyor. Gençler teorik bilgiyle donatılıyor ancak pratik eksikliği yaşıyor.
                </p>
              </div>

              {/* Misyon */}
              <div className="group relative pl-8 border-l-2 border-white/10 hover:border-amber-400 transition-colors duration-500">
                <div className="absolute -left-[11px] top-0 p-1 bg-[#0a0a0a]">
                  <Rocket className="size-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  Misyonumuz
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Eğitimde fırsat eşitliği yaratarak, genç yetenekleri geleceğin teknolojileriyle buluşturmak ve onları sadece birer çalışan değil, birer{" "}
                  <span className="text-white font-medium">inovasyon lideri</span> olarak yetiştirmek.
                </p>
              </div>

              {/* Kanıt */}
              <div className="group relative pl-8 border-l-2 border-white/10 hover:border-cyan-400 transition-colors duration-500">
                <div className="absolute -left-[11px] top-0 p-1 bg-[#0a0a0a]">
                  <BarChart3 className="size-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Kanıt
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Veriye dayalı gelişim takibi ile her öğrencinin ilerlemesi somut metriklerle ölçülür. Başarı tesadüf değildir, tasarlanabilir bir süreçtir.
                </p>
              </div>
            </motion.div>

            {/* Right: Visual Panel with Floating Cards */}
            <motion.div
              className="relative h-[600px] w-full hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Main Image Panel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#111722] to-slate-900 rounded-2xl border border-white/5 shadow-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Students collaborating"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                    <Sparkles className="size-12 text-white mx-auto mb-4" />
                    <div className="text-4xl font-display font-bold text-white mb-2">PUSULA</div>
                    <div className="text-sm font-medium text-slate-300 uppercase tracking-widest">Yeni Nesil Eğitim</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <motion.div
                className="absolute top-10 -left-10 bg-[#111722] border border-white/10 p-4 rounded-lg shadow-xl backdrop-blur-md"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600/20 rounded-md text-emerald-500">
                    <Code className="size-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Yazılım Geliştirme</div>
                    <div className="text-slate-400 text-xs">Uygulamalı Eğitim</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                className="absolute bottom-20 -right-5 bg-[#111722] border border-white/10 p-4 rounded-lg shadow-xl backdrop-blur-md"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-md text-amber-400">
                    <Lightbulb className="size-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Tasarım Odaklı</div>
                    <div className="text-slate-400 text-xs">Düşünme Sistemi</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TEXT REVEAL SECTION */}
      <section className="py-24 bg-[#0a0a0a] flex justify-center items-center relative border-y border-white/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50" />
        <motion.div
          className="max-w-4xl px-6 text-center z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-emerald-500 font-medium tracking-widest mb-4 uppercase text-sm">Eğitim Felsefemiz</p>
          <h2 className="font-display font-black text-5xl md:text-7xl text-white leading-tight">
            <span className="inline-block hover:text-emerald-500 transition-colors duration-300 cursor-default">Kanıt</span>{" "}
            <span className="inline-block hover:text-emerald-500 transition-colors duration-300 cursor-default mx-2">Odaklı</span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Öğrenme
            </span>
          </h2>
          <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Biz sadece öğretmiyoruz. Öğrenmeyi, gelişimi ve başarıyı{" "}
            <span className="text-white underline decoration-emerald-500 decoration-2 underline-offset-4">ölçülebilir</span> kılıyoruz.
          </p>
        </motion.div>
      </section>

      {/* 4. JOURNEY SECTION - Horizontal Scroll Cards with Images */}
      <section className="py-32 bg-[#111722] relative overflow-hidden" id="model">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl text-white mb-4">Gelişim Yolculuğu</h2>
            <p className="text-slate-400 max-w-xl">Sıfırdan zirveye giden yolda sizi bekleyen aşamalar.</p>
          </motion.div>
        </div>

        <div className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory no-scrollbar max-w-7xl mx-auto">
          {journey.map((stage, index) => (
            <motion.div
              key={stage.level}
              className={`min-w-[85vw] md:min-w-[400px] snap-center bg-[#0a0a0a] border rounded-2xl p-1 overflow-hidden group transition-all duration-300 ${stage.glow
                ? "border-amber-400/40 hover:border-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                : `border-white/10 ${stage.borderColor}`
                }`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full bg-[#111722] rounded-xl flex flex-col relative overflow-hidden">
                {/* Image Header */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111722] to-transparent z-10" />
                  <Image
                    src={stage.image}
                    alt={stage.level}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute top-4 right-4 z-20 ${stage.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {stage.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col relative">
                  {stage.glow && (
                    <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500/20 blur-[40px] rounded-full pointer-events-none" />
                  )}
                  <div className="mb-4 relative z-10">
                    <stage.icon className={`size-8 ${stage.accentColor} mb-2`} />
                    <h3 className="font-display font-bold text-2xl text-white">{stage.level}</h3>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">({stage.english})</span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">{stage.description}</p>

                  <ul className="mt-auto space-y-3 relative z-10">
                    {stage.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className={`size-5 ${stage.accentColor}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SDG MARQUEE SECTION */}
      <section id="sdg" className="bg-[#0a0a0a]">
        <SDGMarquee />
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
            alt="Abstract network"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Fingerprint className="size-10 text-white" />
          </div>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-6">Sıra Sende.</h2>
          <p className="text-xl text-slate-300 mb-10 font-light">
            Geleceğini şansa bırakma. PUSULA ile kariyerine profesyonel bir başlangıç yap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kayit">
              <Button
                size="lg"
                className="px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                Hemen Başvur
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="/ogrenmeye-basla">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold rounded-lg text-lg transition-all"
              >
                Programları İncele
                <ExternalLink className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="size-6 text-emerald-500" />
                <h2 className="font-display font-bold text-2xl text-white tracking-tight">PUSULA</h2>
              </div>
              <p className="text-slate-500 max-w-sm text-sm">
                Eskişehir DİGEM çatısı altında, geleceğin teknoloji liderlerini yetiştiren yeni nesil eğitim platformu.
              </p>
            </div>
            <div className="flex gap-12 flex-wrap">
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Platform</h4>
                <Link href="/hakkinda" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">
                  Hakkımızda
                </Link>
                <Link href="/merkez" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">
                  Eğitmenler
                </Link>
                <Link href="/blog" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">
                  Blog
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Yasal</h4>
                <Link href="/gizlilik" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">
                  Gizlilik Politikası
                </Link>
                <Link href="/kosullar" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">
                  Kullanım Şartları
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Sosyal</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="size-10 rounded-full bg-[#111722] flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="size-10 rounded-full bg-[#111722] flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs">© 2024 PUSULA. Tüm hakları saklıdır.</p>
            <p className="text-slate-600 text-xs">Designed for Eskişehir DİGEM</p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-8 right-8 z-40 group">
        <Link href="/kayit">
          <button className="size-14 rounded-full bg-emerald-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-90">
            <ArrowRight className="size-6" />
          </button>
        </Link>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-[#0a0a0a] text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Hızlı Kayıt
        </span>
      </div>
    </main>
  );
}
