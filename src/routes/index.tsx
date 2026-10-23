import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Compass, Crown, Gamepad2, Heart, Menu, ShieldCheck, Sparkles, Star, Trophy, Users, X, CheckCircle2, ChevronDown, Map, ScrollText, Target } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const features = [
  { icon: BookOpen, title: "Histórias bíblicas", text: "Viaje pelas narrativas do Antigo e Novo Testamento e descubra o contexto de cada história." },
  { icon: Gamepad2, title: "Perguntas e desafios", text: "Coloque seus conhecimentos à prova com perguntas interativas e respostas educativas." },
  { icon: Trophy, title: "Níveis e conquistas", text: "Avance em sua jornada, supere etapas e acompanhe suas conquistas." },
  { icon: Compass, title: "Jornadas de exploração", text: "Percorra cenários inspirados no universo bíblico e descubra novos caminhos de aprendizado." },
  { icon: Target, title: "Desafios diários", text: "Crie uma rotina de contato com a Palavra por meio de pequenas missões." },
  { icon: Users, title: "Comunidade", text: "Uma proposta de experiência para compartilhar o aprendizado e caminhar junto." },
  { icon: ScrollText, title: "Personagens e passagens", text: "Conheça personagens, acontecimentos e ensinamentos que marcaram a Bíblia." },
  { icon: Heart, title: "Aprendizado para a vida", text: "Reflita sobre os ensinamentos e descubra como aplicá-los ao seu dia a dia." },
];

const faqs = [
  ["O que é Odisseia Bíblica?", "Uma proposta de experiência bíblica gamificada, com histórias, desafios e aprendizado para diferentes idades."],
  ["O aplicativo já está disponível?", "A jornada está em preparação. Cadastre-se para receber novidades sobre o lançamento."],
  ["Para quem é o aplicativo?", "A experiência foi pensada para crianças, jovens e adultos, com uma linguagem acessível e envolvente."],
  ["Como entro na lista de espera?", "Preencha seu nome e e-mail no formulário desta página. O envio depende da configuração do endpoint de cadastro."],
];

function Home() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (!endpoint) { setStatus("error"); setError("A lista de espera ainda não foi conectada. Configure VITE_WAITLIST_ENDPOINT."); return; }
    setStatus("loading"); setError("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.trim(), source: "odisseia_design" }) });
      if (!response.ok) throw new Error("Não foi possível concluir o cadastro.");
      setStatus("success");
    } catch (err) { setStatus("error"); setError(err instanceof Error ? err.message : "Tente novamente."); }
  }
  return <main className="min-h-screen bg-[#061326] text-white selection:bg-[#e9bd61] selection:text-[#061326]">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061326]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 font-serif text-xl tracking-wide"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e9bd61]/40 text-[#e9bd61]"><Compass size={24}/></span><span>ODISSEIA <span className="text-[#e9bd61]">BÍBLICA</span></span></a>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex"><a className="hover:text-[#e9bd61] transition" href="#experiencia">A experiência</a><a className="hover:text-[#e9bd61] transition" href="#funcionalidades">Funcionalidades</a><a className="hover:text-[#e9bd61] transition" href="#perguntas">Perguntas</a></nav>
        <a href="#espera" className="hidden rounded-xl bg-[#e9bd61] px-5 py-3 text-sm font-bold text-[#071426] transition hover:bg-[#ffda82] md:inline-flex">Lista de espera <ArrowRight className="ml-2" size={17}/></a>
        <button aria-label={menu ? "Fechar menu" : "Abrir menu"} className="md:hidden" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      </div>
      {menu && <nav className="flex flex-col gap-5 border-t border-white/10 bg-[#07182e] px-6 py-6 text-sm md:hidden">{[["A experiência","#experiencia"],["Funcionalidades","#funcionalidades"],["Perguntas","#perguntas"],["Lista de espera","#espera"]].map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav>}
    </header>
    <section id="inicio" className="relative isolate overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,#1b4165_0%,transparent_45%),radial-gradient(ellipse_at_10%_90%,#77502640_0%,transparent_45%)]"/>
      <div className="pointer-events-none absolute right-[-15%] top-20 h-[580px] w-[580px] rounded-full border border-[#e9bd61]/10 shadow-[0_0_140px_30px_#c68d3530]"/>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e9bd61]/30 bg-[#e9bd61]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.22em] text-[#e9bd61]"><Sparkles size={14}/> Uma nova jornada está chegando</span>
          <h1 className="mt-7 max-w-2xl font-serif text-5xl leading-[1.08] tracking-tight md:text-7xl">A mesma história.<br/><span className="text-[#e9bd61]">Uma nova jornada.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Descubra a Bíblia de um jeito envolvente. Explore histórias reais, enfrente desafios, conquiste novos níveis e leve aprendizados para a vida.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href="#espera" className="inline-flex items-center gap-2 rounded-xl bg-[#e9bd61] px-7 py-4 font-bold text-[#081527] shadow-[0_12px_45px_#e9bd6133] transition hover:-translate-y-1 hover:bg-[#ffda82]">Quero fazer parte <ArrowRight size={19}/></a><a href="#experiencia" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-semibold transition hover:border-[#e9bd61]/70 hover:bg-white/5">Conhecer a jornada <Compass size={18}/></a></div>
          <p className="mt-8 flex items-center gap-2 text-sm text-slate-400"><ShieldCheck size={17} className="text-[#e9bd61]"/> Cadastre-se para receber novidades do lançamento.</p>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-8 rounded-full bg-[#e9bd61]/10 blur-3xl"/>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#e9bd61]/25 bg-gradient-to-br from-[#17395b] via-[#0b2039] to-[#091629] p-5 shadow-2xl">
            <img src="/odisseia-hero.png" alt="Mascote corujinha do Odisseia Bíblica em uma aventura" className="aspect-[4/4.4] w-full rounded-2xl object-cover" onError={(e)=>{e.currentTarget.style.display="none";e.currentTarget.nextElementSibling?.classList.remove("hidden");}}/>
            <div className="hidden aspect-[4/4.4] flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-[#e9bd61]/30 bg-[#112b48] text-center"><Compass size={90} className="text-[#e9bd61]"/><p className="max-w-xs px-6 font-serif text-2xl text-[#f4d58b]">Uma aventura extraordinária está prestes a começar</p></div>
            <div className="absolute bottom-9 left-9 right-9 rounded-2xl border border-white/20 bg-[#061326]/80 p-4 backdrop-blur-lg"><span className="text-xs uppercase tracking-[.2em] text-[#e9bd61]">Jogue • Aprenda • Viva a Palavra</span><p className="mt-1 font-serif text-2xl">Odisseia Bíblica</p></div>
          </div>
          <div className="absolute -right-3 top-10 rounded-2xl border border-[#e9bd61]/30 bg-[#0b2039] p-4 shadow-xl md:-right-8"><Star className="text-[#e9bd61]"/></div>
        </div>
      </div>
    </section>
    <section id="experiencia" className="border-y border-white/10 bg-[#0b1d34] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-3xl text-center"><span className="text-xs font-bold uppercase tracking-[.3em] text-[#e9bd61]">Muito mais que um jogo</span><h2 className="mt-4 font-serif text-4xl md:text-5xl">Uma jornada de <span className="text-[#e9bd61]">fé e descobertas</span></h2><p className="mt-6 text-lg leading-8 text-slate-300">Uma nova maneira de conhecer a Palavra de Deus, combinando curiosidade, diversão e conhecimento.</p></div><div className="mt-14 grid gap-5 md:grid-cols-3">{[{icon:Map,title:"Explore",text:"Descubra histórias e lugares do universo bíblico."},{icon:Gamepad2,title:"Desafie-se",text:"Responda perguntas e supere novos desafios."},{icon:Crown,title:"Evolua",text:"Avance na jornada e celebre cada conquista."}].map(({icon:Icon,title,text})=><div key={title} className="group rounded-2xl border border-white/10 bg-white/[.035] p-8 transition duration-300 hover:-translate-y-2 hover:border-[#e9bd61]/50 hover:bg-white/[.06]"><Icon className="text-[#e9bd61]" size={34}/><h3 className="mt-6 font-serif text-3xl">{title}</h3><p className="mt-3 leading-7 text-slate-300">{text}</p></div>)}</div></div></section>
    <section id="funcionalidades" className="py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-3xl"><span className="text-xs font-bold uppercase tracking-[.3em] text-[#e9bd61]">Descubra o aplicativo</span><h2 className="mt-4 font-serif text-4xl md:text-5xl">Cada descoberta é uma <span className="text-[#e9bd61]">nova conquista</span></h2><p className="mt-5 text-slate-300">Conheça os recursos e experiências apresentados para a jornada Odisseia Bíblica.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(({icon:Icon,title,text})=><article key={title} className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#122b47] to-[#0b1c31] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e9bd61]/60"><div className="inline-flex rounded-xl border border-[#e9bd61]/20 bg-[#e9bd61]/10 p-3 text-[#e9bd61]"><Icon size={25}/></div><h3 className="mt-5 font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></article>)}</div><p className="mt-5 text-xs text-slate-400">As funcionalidades exibidas representam a proposta do aplicativo; a disponibilidade final será comunicada no lançamento.</p></div></section>
    <section className="overflow-hidden border-y border-[#e9bd61]/15 bg-[#102b46] py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8"><div className="relative rounded-[2rem] border border-[#e9bd61]/20 bg-[#071629] p-8"><div className="mx-auto max-w-sm rounded-[2rem] border-[8px] border-[#07111f] bg-[#112b48] p-6 shadow-2xl"><div className="mb-7 flex items-center justify-between"><span className="font-serif text-xl">Sua jornada</span><Star className="text-[#e9bd61]"/></div><div className="rounded-xl bg-[#e9bd61]/10 p-5"><p className="text-sm text-[#e9bd61]">Desafio bíblico</p><h3 className="mt-3 font-serif text-2xl">Qual é o maior mandamento?</h3></div><div className="mt-5 space-y-3">{["Amar a Deus","Ser o primeiro","Vencer inimigos","Construir um templo"].map((answer,i)=><div key={answer} className={`flex items-center justify-between rounded-xl border p-3 text-sm ${i===0?"border-emerald-500/50 bg-emerald-600/20":"border-white/10 bg-white/5"}`}><span>{String.fromCharCode(65+i)}. {answer}</span>{i===0&&<CheckCircle2 size={18} className="text-emerald-400"/>}</div>)}</div></div><p className="mt-4 text-center text-xs text-slate-400">Prévia conceitual da experiência — não é uma tela final do app.</p></div><div><span className="text-xs font-bold uppercase tracking-[.3em] text-[#e9bd61]">Aprender pode ser divertido</span><h2 className="mt-4 font-serif text-4xl md:text-5xl">Pequenas perguntas.<br/><span className="text-[#e9bd61]">Grandes aprendizados.</span></h2><p className="mt-6 text-lg leading-8 text-slate-300">Transforme a curiosidade em conhecimento por meio de desafios acessíveis, feedbacks e uma jornada de descobertas para toda a família.</p><a href="#espera" className="mt-8 inline-flex items-center gap-2 font-bold text-[#e9bd61] hover:underline">Quero participar <ArrowRight size={18}/></a></div></div></section>
    <section id="perguntas" className="py-24"><div className="mx-auto max-w-3xl px-5"><h2 className="text-center font-serif text-4xl">Perguntas <span className="text-[#e9bd61]">frequentes</span></h2><div className="mt-10 space-y-3">{faqs.map(([q,a],i)=><div key={q} className="overflow-hidden rounded-xl border border-white/10 bg-white/[.035]"><button className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold" aria-expanded={faq===i} onClick={()=>setFaq(faq===i?null:i)}>{q}<ChevronDown className={`shrink-0 text-[#e9bd61] transition-transform ${faq===i?"rotate-180":""}`} size={19}/></button>{faq===i&&<p className="px-5 pb-5 leading-7 text-slate-300">{a}</p>}</div>)}</div></div></section>
    <section id="espera" className="relative overflow-hidden border-t border-[#e9bd61]/20 bg-[radial-gradient(ellipse_at_top,#1d3b59_0%,#071426_65%)] py-28"><div className="mx-auto max-w-3xl px-5 text-center"><Sparkles className="mx-auto text-[#e9bd61]" size={35}/><span className="mt-5 block text-xs font-bold uppercase tracking-[.3em] text-[#e9bd61]">Seja um dos primeiros</span><h2 className="mt-4 font-serif text-4xl md:text-6xl">Sua próxima aventura <span className="text-[#e9bd61]">começa aqui.</span></h2><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">Entre para a lista de espera e receba novidades sobre o lançamento do Odisseia Bíblica.</p>{status==="success"?<div role="status" className="mx-auto mt-9 max-w-xl rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-6"><CheckCircle2 className="mx-auto mb-3 text-emerald-400"/>Cadastro recebido! Fique de olho no seu e-mail.</div>:<form onSubmit={submit} className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b1c31]/90 p-5 text-left shadow-2xl"><label className="text-sm text-slate-200" htmlFor="name">Seu nome</label><input id="name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[#e9bd61]"/><label className="mt-2 text-sm text-slate-200" htmlFor="email">Seu melhor e-mail</label><input id="email" type="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@exemplo.com" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-[#e9bd61]"/><button disabled={status==="loading"} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#e9bd61] px-6 py-4 font-bold text-[#071426] transition hover:bg-[#ffda82] disabled:opacity-50">{status==="loading"?"Enviando...":"Entrar na lista de espera"}<ArrowRight size={18}/></button>{status==="error"&&<p role="alert" className="text-sm text-rose-300">{error}</p>}<p className="text-center text-xs text-slate-400">Seus dados serão utilizados para novidades do Odisseia Bíblica.</p></form>}</div></section>
    <footer className="border-t border-white/10 bg-[#040d1b] py-10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center md:flex-row lg:px-8"><p className="font-serif text-lg">ODISSEIA <span className="text-[#e9bd61]">BÍBLICA</span></p><p className="text-sm text-slate-400">Jogue • Aprenda • Viva a Palavra</p><a href="#inicio" className="text-sm text-[#e9bd61] hover:underline">Voltar ao início ↑</a></div></footer>
  </main>;
}
