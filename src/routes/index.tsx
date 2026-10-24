import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Crown, Gamepad2, Heart, Users, UserRound, BarChart3, Youtube, Instagram, Facebook, Compass } from "lucide-react";
import hero from "@/assets/s1-hero-background.png";
import jornada from "@/assets/s2-jornada-background.png";
import divertido from "@/assets/s3-divertido-background.png";
import explore from "@/assets/s4-explore-background.png";
import quiz from "@/assets/s5-quiz-background.png";
import idades from "@/assets/s6-idades-background.png";
import leve from "@/assets/s7-leve-background.png";
import mascotSrc from "@/assets/odisseia-mascote-original.png.asset.json";
import mascotMotion from "@/assets/odisseia-mascote-natural.gif.asset.json";

const thAt = explore;
const thNt = jornada;
const thPb = idades;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Odisseia Bíblica — Uma jornada de fé" },
      { name: "description", content: "App de perguntas e respostas que torna o aprendizado da Bíblia incrível, envolvente e divertido. Baixe o Aplicativo." },
      { property: "og:title", content: "Odisseia Bíblica — Uma jornada de fé" },
      { property: "og:description", content: "Descubra histórias reais que transformam sua vida. Baixe o Aplicativo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OdisseiaLanding,
});


function Logo({ big = false }: { big?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2 text-gold">
      <Compass className={big ? "h-12 w-12" : "h-8 w-8"} strokeWidth={1.4} />
      <span className={`font-display font-semibold leading-none ${big ? "text-2xl" : "text-base"}`}>
        <span className="text-foreground">ODISSEIA</span>{big ? " " : <br />}BÍBLICA
      </span>
    </a>
  );
}

const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" aria-hidden className="shrink-0">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 520 512" width={24} height={24} aria-hidden className="shrink-0">
      <path fill="#00A0FF" d="M47.6 20.3C44.5 23.5 42.6 28.4 42.6 35.1v441.8c0 6.7 1.9 11.6 5 14.8l1.2 1.1 247.5-247.5v-5.8L48.8 19.2l-1.2 1.1z" />
      <path fill="#FFBC00" d="M396.4 344.6 296.3 244.5v-5.8l100.1-100.1 2.3 1.3 118.5 67.3c33.9 19.2 33.9 50.6 0 69.9l-118.5 67.3-2.3 1.2z" />
      <path fill="#FF3A44" d="M398.7 343.4 296.3 241 47.6 489.7c11.1 11.6 29.5 13 49.3 1.7l301.8-148z" />
      <path fill="#00C853" d="M398.7 138.6 96.9 29.4C77.1 18.1 58.7 19.5 47.6 31.1L296.3 241l102.4-102.4z" />
    </svg>
  );
}

function StoreBadge({ store, href }: { store: "apple" | "google"; href: string }) {
  const apple = store === "apple";
  return (
    <a href={href} className="store-badge" aria-label={apple ? "Baixar na App Store" : "Baixar no Google Play"}>
      {apple ? <AppleGlyph /> : <PlayGlyph />}
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-[.14em] opacity-75">{apple ? "Baixar na" : "Disponível no"}</span>
        <span className="block text-lg font-semibold tracking-tight">{apple ? "App Store" : "Google Play"}</span>
      </span>
    </a>
  );
}

function Scene({ src, children, className = "", id, imgClass = "", mascot = false }: { src: string; children: React.ReactNode; className?: string; id?: string; imgClass?: string; mascot?: boolean }) {
  const sceneRef = useRef<HTMLElement>(null);
  const [animateMascot, setAnimateMascot] = useState(false);
  useEffect(() => {
    if (!mascot) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAnimateMascot(!preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, [mascot]);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    scene.dataset['motion'] = 'ready';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      scene.dataset['motion'] = 'visible';
      observer.unobserve(scene);
    }, { threshold: 0.08 });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sceneRef} id={id} className={`scene-section relative isolate scroll-mt-16 overflow-hidden ${className}`}>
      <img src={src} alt="" aria-hidden className={`scene-image absolute inset-0 -z-20 h-full w-full object-cover ${imgClass}`} />
      {mascot && (
        <div className={`mascot-stage mascot-hero${animateMascot ? " mascot-natural-motion" : ""}`}>
          <img src={animateMascot ? mascotMotion.url : mascotSrc.url} alt="" aria-hidden width={1351} height={1164} className="mascot-cast-shadow" />
          <img src={animateMascot ? mascotMotion.url : mascotSrc.url} alt="Mascote de Odisseia Bíblica" width={1351} height={1164} className="scene-mascot" />
        </div>
      )}
      {children}
    </section>
  );
}

function OdisseiaLanding() {
  const [answer, setAnswer] = useState<number | null>(null);

  const options = ["Amar a Deus", "Ser o primeiro", "Vencer inimigos", "Construir um templo"];

  return (
    <main className="dark min-h-screen bg-navy-deep text-foreground">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
          <Logo />
          <a href="#espera" className="btn-gold px-4 py-2.5 text-xs sm:px-5">Baixe o Aplicativo <ArrowRight size={16} /></a>
        </div>
      </header>

      {/* 1 Hero */}
      <Scene id="inicio" src={hero} mascot imgClass="object-[70%_center]" className="flex min-h-[640px] items-center pt-24 pb-12 lg:min-h-[720px]">
        <div className="fade-l absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="scene-copy max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-gold">Uma nova jornada está começando</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] md:text-[3.4rem]">DESCUBRA HISTÓRIAS REAIS <span className="text-gold">QUE TRANSFORMAM SUA VIDA</span></h1>
            <p className="mt-5 max-w-md text-base leading-7 text-foreground/90">Odisseia Bíblica é um App de perguntas e respostas que torna o aprendizado da Bíblia uma experiência incrível, envolvente e divertida.</p>
            <a href="#espera" className="btn-gold mt-8 py-3 pr-7 pl-3 text-sm"><span className="grid h-8 w-8 place-items-center rounded-full bg-navy-deep text-gold"><ArrowRight size={18} /></span>Baixe o Aplicativo</a>
            <div className="mt-10 flex flex-wrap gap-4">
              {[[Gamepad2, "Divirta-se", "e responda desafios"], [BookOpen, "Explore", "histórias bíblicas"], [BarChart3, "Evolua", "em níveis e conquistas"]].map(([I, t, d]) => {
                const Icon = I as typeof Gamepad2;
                return <div key={t as string} className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full border border-gold/60 text-gold"><Icon size={22} /></span><span className="text-xs leading-tight"><b className="block uppercase">{t as string}</b><span className="text-foreground/75">{d as string}</span></span></div>;
              })}
            </div>
          </div>
        </div>
      </Scene>

      {/* 2 Jornada */}
      <Scene id="como-funciona" src={jornada} imgClass="object-left" className="flex min-h-[420px] items-center py-12">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="scene-copy w-full max-w-lg rounded-2xl bg-navy-deep/85 p-7 text-foreground shadow-xl backdrop-blur-md md:p-10">
            <h2 className="font-display text-2xl font-semibold leading-tight md:text-4xl">MAIS QUE DIVERSÃO, UMA JORNADA DE FÉ</h2>
            <p className="mt-4 font-medium leading-7">Cada desafio superado te leva mais perto de conhecer a palavra de Deus e viver grandes histórias que marcaram o mundo.</p>
          </div>
        </div>
      </Scene>

      {/* 3 Divertido */}
      <Scene id="funcionalidades" src={divertido} imgClass="object-[25%_center]" className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl px-5 md:grid-cols-[1fr_1.15fr] lg:px-8">
          <div className="hidden md:block" />
          <div className="scene-copy rounded-2xl border border-gold/15 bg-navy-deep/80 p-7 backdrop-blur-md md:p-10">
            <p className="text-sm uppercase tracking-[.25em] text-gold">Aprender a Bíblia</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">NUNCA FOI TÃO <span className="block text-5xl text-gold md:text-6xl">DIVERTIDO</span></h2>
            <p className="mt-4 max-w-md text-foreground/90">Divirta-se, responda, explore e evolua em uma experiência feita para todas as idades.</p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[[Gamepad2, "Desafios", "interativos"], [BookOpen, "Histórias", "bíblicas reais"], [BarChart3, "Evolução", "em níveis"], [Crown, "Conquistas", "especiais"]].map(([I, t, d]) => {
                const Icon = I as typeof Gamepad2;
                return <div key={t as string} className="text-center"><Icon className="mx-auto text-gold" size={36} /><b className="mt-3 block text-sm uppercase">{t as string}</b><span className="text-xs text-foreground/75">{d as string}</span></div>;
              })}
            </div>
          </div>
        </div>
      </Scene>

      {/* 4 Explore */}
      <Scene src={explore} className="py-12 md:py-16">
        <div className="fade-l absolute inset-0 -z-10" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 md:grid-cols-[1fr_1fr_1fr] lg:px-8">
          <div>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">EXPLORE A BÍBLIA COM UM NOVO <span className="text-gold">OLHAR</span></h2>
            <p className="mt-4 text-sm leading-6 text-foreground/90">Viaje por grandes histórias, conheça personagens marcantes e reviva momentos que revelam o plano de Deus para a humanidade.</p>
          </div>
          <div className="hidden md:block" />
          <div className="space-y-3">
            {[[thAt, "Antigo Testamento"], [thNt, "Novo Testamento"], [thPb, "Personagens Bíblicos"]].map(([img, t]) => (
              <a key={t} href="#espera" className="group flex items-center overflow-hidden rounded-xl border border-foreground/40 bg-navy-deep/80 backdrop-blur transition hover:border-gold">
                <span className="relative block h-20 w-32 shrink-0 overflow-hidden">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="flex-1 px-4 text-sm font-semibold uppercase">{t}</span>
                <span className="mr-4 grid h-7 w-7 place-items-center rounded-full border border-foreground/60 transition group-hover:border-gold group-hover:text-gold"><ArrowRight size={14} /></span>
              </a>
            ))}
          </div>
        </div>
      </Scene>

      {/* 5 Quiz */}
      <Scene id="perguntas" src={quiz} className="py-12 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="rounded-2xl bg-parchment p-6 text-ink shadow-2xl md:max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/70">Desafios que fazem você pensar</p>
            <h3 className="mt-3 mb-4 text-lg font-bold">Qual é o maior mandamento?</h3>
            <div className="space-y-2">
              {options.map((o, i) => (
                <button type="button" key={o} onClick={() => setAnswer(i)} aria-pressed={answer === i}
                  className={`flex w-full items-center gap-3 rounded-full border px-2 py-1.5 text-left text-sm transition ${answer === i ? (i === 0 ? "border-success bg-success/25" : "border-destructive bg-destructive/15") : "border-ink/25 bg-background/0 hover:border-ink/60"}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${answer === i && i === 0 ? "bg-success text-navy-deep" : "bg-navy-deep text-parchment"}`}>{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{o}</span>
                  {answer === i && i === 0 && <CheckCircle2 size={18} className="text-success" />}
                </button>
              ))}
            </div>
            {answer !== null && <p role="status" className="mt-3 text-xs font-medium">{answer === 0 ? "Correto! Veja Mateus 22:37–38." : "Tente novamente! Dica: Mateus 22:37–38."}</p>}
          </div>
          <div className="scene-copy rounded-2xl bg-navy-deep/85 p-7 backdrop-blur-md md:max-w-md">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">PEQUENAS PERGUNTAS <span className="block text-gold">GRANDES APRENDIZADOS</span></h2>
            <p className="mt-4 text-sm leading-6 text-foreground/90 [text-shadow:0_2px_8px_var(--navy-deep)]">Aprenda de forma leve e envolvente com perguntas que desafiam o seu conhecimento e fortalecem a sua fé.</p>
          </div>
        </div>
      </Scene>

      {/* 6 Idades */}
      <Scene id="idades" src={idades} imgClass="object-[80%_center]" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="max-w-sm rounded-2xl bg-navy-deep/60 p-6 md:bg-transparent md:p-0">
            <h2 className="font-display text-4xl leading-tight md:text-5xl">PARA TODAS <span className="block text-gold">AS IDADES</span></h2>
            <p className="mt-4 text-sm leading-6 text-foreground/90">Uma jornada para crianças, jovens e adultos. Aprenda, reflita e compartilhe a Palavra em família e com amigos.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[[Users, "Divirta-se em família"], [UserRound, "Faça parte de uma comunidade"], [Heart, "Fortaleça sua fé"]].map(([I, t]) => {
                const Icon = I as typeof Users;
                return <div key={t as string} className="text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/70 text-gold"><Icon size={24} /></span><span className="mt-2 block text-[11px] font-semibold uppercase leading-tight">{t as string}</span></div>;
              })}
            </div>
          </div>
        </div>
      </Scene>

      {/* 7 Leve / waitlist */}
      <Scene id="espera" src={leve} imgClass="object-[30%_center]" className="py-10">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="scene-copy mx-auto w-full max-w-3xl rounded-2xl border border-gold/20 bg-navy-deep/85 p-7 backdrop-blur-md md:p-10">
            <h2 className="text-center font-display text-4xl leading-tight md:text-5xl">LEVE A BÍBLIA <span className="block text-gold">COM VOCÊ</span></h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-foreground/90 md:text-base">Onde estiver, sempre há uma nova história para descobrir. Odisseia Bíblica no seu celular, pronto para se divertir.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <StoreBadge store="apple" href={APP_STORE_URL} />
              <StoreBadge store="google" href={PLAY_STORE_URL} />
            </div>
          </div>
        </div>
      </Scene>

      <footer className="bg-navy-deep px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div><Logo big /><p className="mt-1 pl-14 text-[10px] tracking-[.2em] text-foreground/70">DIVIRTA-SE • APRENDA • VIVA A PALAVRA</p></div>
          <div className="flex gap-4 text-foreground/80"><a href="#" aria-label="YouTube"><Youtube size={20} /></a><a href="#" aria-label="Instagram"><Instagram size={20} /></a><a href="#" aria-label="Facebook"><Facebook size={20} /></a></div>
        </div>
      </footer>
    </main>
  );
}
