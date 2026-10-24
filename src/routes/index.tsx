import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Crown, Gamepad2, Heart, Users, UserRound, BarChart3, Youtube, Instagram, Facebook, Compass } from "lucide-react";
import hero from "@/assets/s1-hero-background.webp";
import heroMobile from "@/assets/s1-hero-mobile.webp";
import jornada from "@/assets/s2-jornada-background.webp";
import divertido from "@/assets/s3-divertido-background.webp";
import explore from "@/assets/s4-explore-background.webp";
import quiz from "@/assets/s5-quiz-background.webp";
import idades from "@/assets/s6-idades-background.webp";
import leve from "@/assets/s7-leve-background.webp";
import mascotSrc from "@/assets/odisseia-mascote-original.webp.asset.json";
import mascotMotion from "@/assets/odisseia-mascote-natural.webp.asset.json";
import { SiteInfo } from "@/components/SiteInfo";

const thAt = explore;
const thNt = jornada;
const thPb = idades;

const EXPLORE_TABS = [
  {
    id: "at",
    img: thAt,
    label: "Antigo Testamento",
    kicker: "39 livros • de Gênesis a Malaquias",
    text: "Do começo do mundo à promessa de um Salvador: a caminhada de um povo que espera, erra e é conduzido por aquilo que Deus prometeu.",
    items: ["A criação do mundo", "Noé e o dilúvio", "Abraão, Isaque e Jacó", "Moisés e a saída do Egito", "Davi e Golias", "Os profetas"],
  },
  {
    id: "nt",
    img: thNt,
    label: "Novo Testamento",
    kicker: "27 livros • de Mateus a Apocalipse",
    text: "A vida de Jesus, a igreja que nasce e a esperança do céu. O que foi prometido se cumpre e ganha novo sentido.",
    items: ["O nascimento de Jesus", "Parábolas e milagres", "A cruz e a ressurreição", "A igreja em Atos", "As cartas de Paulo", "O Apocalipse"],
  },
  {
    id: "pb",
    img: thPb,
    label: "Personagens Bíblicos",
    kicker: "Homens e mulheres • de Gênesis a Apocalipse",
    text: "Gente comum, coragem extraordinária. Cada personagem é uma porta para entender a fé na prática do dia a dia.",
    items: ["Rute, a que não desistiu", "Ester, para um tempo como este", "Pedro, do medo à missão", "Maria, a mãe de Jesus", "Paulo, de perseguidor a apóstolo", "Sansão, força e fraqueza"],
  },
];


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

function Scene({ src, mobileSrc, children, className = "", id, imgClass = "", mascot = false }: { src: string; mobileSrc?: string; children: React.ReactNode; className?: string; id?: string; imgClass?: string; mascot?: boolean }) {
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
      <div className="mystery-mist" aria-hidden />
      <div className="mystery-motes" aria-hidden />
      {mobileSrc ? (
        <>
          <img src={mobileSrc} alt="" aria-hidden className={`scene-image absolute inset-0 -z-20 h-full w-full object-cover md:hidden ${imgClass}`} />
          <img src={src} alt="" aria-hidden className={`scene-image absolute inset-0 -z-20 h-full w-full object-cover max-md:hidden ${imgClass}`} />
        </>
      ) : (
        <img src={src} loading="lazy" decoding="async" alt="" aria-hidden className={`scene-image absolute inset-0 -z-20 h-full w-full object-cover ${imgClass}`} />
      )}
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
  const [openTab, setOpenTab] = useState("at");
  const lanternRef = useRef<HTMLDivElement>(null);

  // Faint golden lantern glow that breathes while the visitor scrolls.
  useEffect(() => {
    const lantern = lanternRef.current;
    if (!lantern || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let glow = 0;
    const tick = () => {
      glow *= 0.9;
      lantern.style.opacity = glow < 0.004 ? "0" : glow.toFixed(3);
      if (glow > 0.004) raf = requestAnimationFrame(tick);
      else { raf = 0; glow = 0; }
    };
    const onScroll = () => {
      glow = Math.min(0.14, glow + 0.03);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Small light ripples where the finger touches the screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("ontouchstart" in window)) return;
    let last = 0;
    let live = 0;
    const spawn = (x: number, y: number) => {
      const now = performance.now();
      if (now - last < 160 || live >= 8) return;
      last = now;
      live++;
      const spark = document.createElement("span");
      spark.className = "mystery-touch";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      document.body.appendChild(spark);
      window.setTimeout(() => { spark.remove(); live--; }, 1200);
    };
    const onTouch = (event: TouchEvent) => {
      const point = event.touches[0];
      if (point) spawn(point.clientX, point.clientY);
    };
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, []);



  const options = ["Amar a Deus", "Ser o primeiro", "Vencer inimigos", "Construir um templo"];

  return (
    <main className="dark min-h-screen bg-navy-deep text-foreground">
      <div ref={lanternRef} className="mystery-lantern" aria-hidden />
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
          <Logo />
          <a href="#espera" className="btn-gold px-4 py-2.5 text-xs sm:px-5">Baixe o Aplicativo <ArrowRight size={16} /></a>
        </div>
      </header>

      {/* 1 Hero */}
      <Scene id="inicio" src={hero} mobileSrc={heroMobile} mascot imgClass="object-[70%_center]" className="flex min-h-[640px] items-center pt-24 pb-12 lg:min-h-[720px]">
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden />
        <div className="fade-l absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="scene-copy max-w-xl max-md:mx-auto max-md:text-center">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-gold">Uma nova jornada está começando</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] md:text-[3.4rem]">DESCUBRA HISTÓRIAS REAIS <span className="text-gold">QUE TRANSFORMAM SUA VIDA</span></h1>
            <p className="mt-5 max-w-md text-base leading-7 text-foreground/90 max-md:mx-auto">Odisseia Bíblica é um App de perguntas e respostas que torna o aprendizado da Bíblia uma experiência incrível, envolvente e divertida.</p>
            <div className="mt-10 flex flex-wrap gap-4 max-md:justify-center">
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
          <div className="scene-copy w-full max-w-lg max-md:mx-auto max-md:text-center rounded-2xl bg-navy-deep/85 p-7 text-foreground shadow-xl backdrop-blur-md md:p-10">
            <h2 className="font-display text-2xl font-semibold leading-tight md:text-4xl">MAIS QUE DIVERSÃO, UMA JORNADA DE FÉ</h2>
            <p className="mt-4 font-medium leading-7">Cada desafio superado te leva mais perto de conhecer a palavra de Deus e viver grandes histórias que marcaram o mundo.</p>
          </div>
        </div>
      </Scene>

      {/* 3 Divertido */}
      <Scene id="funcionalidades" src={divertido} imgClass="object-[25%_center]" className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl px-5 md:grid-cols-[1fr_1.15fr] lg:px-8">
          <div className="hidden md:block" />
          <div className="scene-copy max-md:text-center rounded-2xl border border-gold/15 bg-navy-deep/80 p-7 backdrop-blur-md md:p-10">
            <p className="text-sm uppercase tracking-[.25em] text-gold">Aprender a Bíblia</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">NUNCA FOI TÃO <span className="block text-5xl text-gold md:text-6xl">DIVERTIDO</span></h2>
            <p className="mt-4 max-w-md text-foreground/90 max-md:mx-auto">Divirta-se, responda, explore e evolua em uma experiência feita para todas as idades.</p>
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
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr_1fr]">
            <div>
              <h2 className="font-display text-4xl leading-tight md:text-5xl max-md:text-center">EXPLORE A BÍBLIA COM UM NOVO <span className="text-gold">OLHAR</span></h2>
              <p className="mt-4 text-sm leading-6 text-foreground/90 max-md:text-center">Viaje por grandes histórias, conheça personagens marcantes e reviva momentos que revelam o plano de Deus para a humanidade.</p>
            </div>
            <div className="hidden md:block" />
            <div className="space-y-3">
              {EXPLORE_TABS.map((tab) => {
                const active = openTab === tab.id;
                return (
                  <button type="button" key={tab.id} onClick={() => setOpenTab(active ? "" : tab.id)} aria-expanded={active} aria-controls="explore-conteudo"
                    className={`group flex w-full items-center overflow-hidden rounded-xl border bg-navy-deep/80 text-left backdrop-blur transition ${active ? "border-gold" : "border-foreground/40 hover:border-gold"}`}>
                    <span className="relative block h-20 w-32 shrink-0 overflow-hidden">
                      <img src={tab.img} loading="lazy" decoding="async" alt="" className="h-full w-full object-cover" />
                    </span>
                    <span className="flex-1 px-4 text-sm font-semibold uppercase">{tab.label}</span>
                    <span className={`mr-4 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${active ? "border-gold text-gold" : "border-foreground/60 group-hover:border-gold group-hover:text-gold"}`}>
                      <ArrowRight size={14} className={`transition-transform duration-300 ${active ? "rotate-90" : ""}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {EXPLORE_TABS.filter((tab) => tab.id === openTab).map((tab) => (
            <div key={tab.id} id="explore-conteudo" className="explore-panel mt-6 rounded-2xl border border-gold/20 bg-navy-deep/85 p-6 backdrop-blur-md md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-gold max-md:text-center">{tab.kicker}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight md:text-3xl max-md:text-center">{tab.label}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/90 max-md:mx-auto max-md:text-center">{tab.text}</p>
              <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 max-md:mx-auto max-md:w-fit">
                {tab.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">

                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#espera" className="btn-gold mt-6 inline-flex px-5 py-2.5 text-xs max-md:mx-auto">Baixe o Aplicativo <ArrowRight size={16} /></a>
            </div>
          ))}
        </div>
      </Scene>


      {/* 5 Quiz */}
      <Scene id="perguntas" src={quiz} className="py-12 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="rounded-2xl bg-parchment p-6 text-ink shadow-2xl md:max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/70 max-md:text-center">Desafios que fazem você pensar</p>
            <h3 className="mt-3 mb-4 text-lg font-bold max-md:text-center">Qual é o maior mandamento?</h3>
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
          <div className="scene-copy max-md:mx-auto max-md:text-center rounded-2xl bg-navy-deep/85 p-7 backdrop-blur-md md:max-w-md">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">PEQUENAS PERGUNTAS <span className="block text-gold">GRANDES APRENDIZADOS</span></h2>
            <p className="mt-4 text-sm leading-6 text-foreground/90 [text-shadow:0_2px_8px_var(--navy-deep)]">Aprenda de forma leve e envolvente com perguntas que desafiam o seu conhecimento e fortalecem a sua fé.</p>
          </div>
        </div>
      </Scene>

      {/* 6 Idades */}
      <Scene id="idades" src={idades} imgClass="object-[80%_center]" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="max-w-sm max-md:mx-auto max-md:text-center rounded-2xl bg-navy-deep/60 p-6 md:bg-transparent md:p-0">
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

      <SiteInfo />

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
          <div className="flex flex-col items-center md:items-start"><Logo big /><p className="mt-1 pl-14 text-[10px] tracking-[.2em] text-foreground/70 max-md:pl-0 max-md:text-center">DIVIRTA-SE • APRENDA • VIVA A PALAVRA</p></div>
          <div className="flex gap-4 text-foreground/80"><a href="https://www.youtube.com/@odisseiabiblica" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={20} /></a><a href="https://www.instagram.com/odisseiabiblica/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a><a href="https://www.facebook.com/odisseiabiblica" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a></div>
        </div>
      </footer>
    </main>
  );
}
