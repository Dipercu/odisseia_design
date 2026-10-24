import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Crown, Gamepad2, Heart, Menu, Users, UserRound, X, BarChart3, Youtube, Instagram, Facebook, Compass } from "lucide-react";
import hero from "@/assets/s1-hero-background.png";
import jornada from "@/assets/s2-jornada-background.png";
import divertido from "@/assets/s3-divertido-background.png";
import explore from "@/assets/s4-explore-background.png";
import quiz from "@/assets/s5-quiz-background.png";
import idades from "@/assets/s6-idades-background.png";
import leve from "@/assets/s7-leve-background.png";
import mascotSrc from "@/assets/odisseia-mascote-original.png.asset.json";

const thAt = explore;
const thNt = jornada;
const thPb = idades;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Odisseia Bíblica — Uma jornada de fé" },
      { name: "description", content: "App de perguntas e respostas que torna o aprendizado da Bíblia incrível, envolvente e divertido. Entre na lista de espera." },
      { property: "og:title", content: "Odisseia Bíblica — Uma jornada de fé" },
      { property: "og:description", content: "Descubra histórias reais que transformam sua vida. Entre na lista de espera." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OdisseiaLanding,
});

const nav = [["Início", "#inicio"], ["Como Funciona", "#como-funciona"], ["Funcionalidades", "#funcionalidades"], ["Depoimentos", "#idades"], ["FAQ", "#perguntas"]];

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

function Scene({ src, children, className = "", id, imgClass = "", mascot = false }: { src: string; children: React.ReactNode; className?: string; id?: string; imgClass?: string; mascot?: boolean }) {
  const sceneRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    scene.dataset.motion = 'ready';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      scene.dataset.motion = 'visible';
      observer.unobserve(scene);
    }, { threshold: 0.08 });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sceneRef} id={id} className={`scene-section relative isolate scroll-mt-16 overflow-hidden ${className}`}>
      <img src={src} alt="" aria-hidden className={`scene-image absolute inset-0 -z-20 h-full w-full object-cover ${imgClass}`} />
      {mascot && (
        <div className="mascot-stage mascot-hero">
          <img src={mascotSrc.url} alt="" aria-hidden width={1351} height={1164} className="mascot-cast-shadow" />
          <img src={mascotSrc.url} alt="Mascote original de Odisseia Bíblica" width={1351} height={1164} className="scene-mascot" />
        </div>
      )}
      {children}
    </section>
  );
}

function OdisseiaLanding() {
  const [menu, setMenu] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const endpoint = import.meta.env["VITE_WAITLIST_ENDPOINT"] as string | undefined;

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) { setState("error"); setError("A lista de espera ainda não foi conectada."); return; }
    setState("sending"); setError("");
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.trim(), source: "odisseia_design" }) });
      if (!r.ok) throw new Error("Não foi possível enviar o cadastro.");
      setState("done");
    } catch (e) { setState("error"); setError(e instanceof Error ? e.message : "Erro ao cadastrar."); }
  }

  const options = ["Amar a Deus", "Ser o primeiro", "Vencer inimigos", "Construir um templo"];

  return (
    <main className="dark min-h-screen bg-navy-deep text-foreground">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
          <Logo />
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {nav.map(([l, h]) => <a key={h} href={h} className="transition hover:text-gold">{l}</a>)}
          </nav>
          <a href="#espera" className="btn-gold hidden px-5 py-2.5 text-xs md:inline-flex">Entrar na lista de espera <ArrowRight size={16} /></a>
          <button type="button" aria-label={menu ? "Fechar menu" : "Abrir menu"} aria-expanded={menu} onClick={() => setMenu(!menu)} className="lg:hidden">{menu ? <X /> : <Menu />}</button>
        </div>
        {menu && <nav className="flex flex-col gap-4 bg-navy-deep/95 px-6 py-5 lg:hidden">{[...nav, ["Lista de espera", "#espera"]].map(([l, h]) => <a key={h} href={h} onClick={() => setMenu(false)}>{l}</a>)}</nav>}
      </header>

      {/* 1 Hero */}
      <Scene id="inicio" src={hero} mascot imgClass="object-[70%_center]" className="flex min-h-[640px] items-center pt-24 pb-12 lg:min-h-[720px]">
        <div className="fade-l absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="scene-copy max-w-xl rounded-2xl bg-navy-deep/65 p-6 backdrop-blur-sm md:bg-transparent md:p-0">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-gold">Uma nova jornada está começando</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] md:text-[3.4rem]">DESCUBRA HISTÓRIAS REAIS <span className="text-gold">QUE TRANSFORMAM SUA VIDA</span></h1>
            <p className="mt-5 max-w-md text-base leading-7 text-foreground/90">Odisseia Bíblica é um App de perguntas e respostas que torna o aprendizado da Bíblia uma experiência incrível, envolvente e divertida.</p>
            <a href="#espera" className="btn-gold mt-8 py-3 pr-7 pl-3 text-sm"><span className="grid h-8 w-8 place-items-center rounded-full bg-navy-deep text-gold"><ArrowRight size={18} /></span>Entrar na lista de espera</a>
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
        <div className="w-full">
          <div className="scene-copy mx-5 max-w-lg rounded-2xl bg-navy-deep/85 p-7 text-foreground shadow-xl backdrop-blur-md md:ml-[10%] md:p-10">
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
          <div className="rounded-2xl bg-parchment p-6 text-ink shadow-2xl md:ml-8 md:max-w-sm">
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
        <div className="mx-auto grid w-full max-w-7xl px-5 md:grid-cols-[1fr_1.1fr] lg:px-8">
          <div className="hidden md:block" />
          <div className="scene-copy max-w-md rounded-2xl border border-gold/20 bg-navy-deep/85 p-7 backdrop-blur-md">
            <h2 className="font-display text-4xl leading-tight">LEVE A BÍBLIA <span className="block text-gold">COM VOCÊ</span></h2>
            <p className="mt-3 text-sm leading-6 text-foreground/90">Onde estiver, sempre há uma nova história para descobrir. Odisseia Bíblica no seu celular, pronto para se divertir.</p>
            {state === "done" ? <p role="status" className="mt-6 rounded-xl border border-success/50 bg-success/15 p-4">Cadastro recebido! Acompanhe seu e-mail.</p> : (
              <form onSubmit={subscribe} className="mt-5 space-y-3">
                <label htmlFor="nome" className="sr-only">Nome</label>
                <input id="nome" required maxLength={100} value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" className="w-full rounded-full border border-foreground/25 bg-navy/80 px-5 py-3 text-sm outline-none focus:border-gold" />
                <label htmlFor="email" className="sr-only">E-mail</label>
                <input id="email" type="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" className="w-full rounded-full border border-foreground/25 bg-navy/80 px-5 py-3 text-sm outline-none focus:border-gold" />
                <button disabled={state === "sending"} className="btn-gold py-3 pr-7 pl-3 text-sm disabled:opacity-50">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-deep text-gold"><ArrowRight size={18} /></span>
                  {state === "sending" ? "Enviando..." : "Entrar na lista de espera"}
                </button>
                {state === "error" && <p role="alert" className="text-sm text-destructive">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </Scene>

      <footer className="bg-navy-deep px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div><Logo big /><p className="mt-1 pl-14 text-[10px] tracking-[.2em] text-foreground/70">DIVIRTA-SE • APRENDA • VIVA A PALAVRA</p></div>
          <nav className="flex gap-6 text-xs text-foreground/75">{nav.filter(n => n[0] !== "Depoimentos").map(([l, h]) => <a key={h} href={h} className="hover:text-gold">{l}</a>)}</nav>
          <div className="flex gap-4 text-foreground/80"><a href="#" aria-label="YouTube"><Youtube size={20} /></a><a href="#" aria-label="Instagram"><Instagram size={20} /></a><a href="#" aria-label="Facebook"><Facebook size={20} /></a></div>
        </div>
      </footer>
    </main>
  );
}
