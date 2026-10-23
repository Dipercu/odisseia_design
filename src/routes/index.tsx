import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: OdisseiaLanding });

/**
 * Layout fiel ao storyboard aprovado.
 * Coloque a imagem otimizada em public/odisseia-layout.webp.
 * A imagem contém a direção de arte; navegação, CTAs, quiz e formulário
 * são componentes reais e acessíveis sobrepostos ao layout.
 */
function OdisseiaLanding() {
  const [menu, setMenu] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle"|"sending"|"done"|"error">("idle");
  const [error, setError] = useState("");
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;
  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) { setState("error"); setError("A lista de espera ainda não foi conectada ao Supabase."); return; }
    setState("sending"); setError("");
    try {
      const response = await fetch(endpoint, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name.trim(),email:email.trim(),source:"odisseia_design"})});
      if (!response.ok) throw new Error("Não foi possível enviar o cadastro.");
      setState("done");
    } catch(e) {setState("error");setError(e instanceof Error?e.message:"Erro ao cadastrar.");}
  }
  return <main className="min-h-screen bg-[#061426] text-white">
    <div className="fixed inset-x-0 top-0 z-50 border-b border-[#f7c96c]/15 bg-[#041327]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
        <a href="#inicio" className="font-serif text-lg tracking-wide text-[#f4d38c]">✧ ODISSEIA BÍBLICA</a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 text-sm md:flex">
          <a href="#inicio" className="hover:text-[#f5cb6a]">Início</a><a href="#como-funciona" className="hover:text-[#f5cb6a]">Como funciona</a><a href="#funcionalidades" className="hover:text-[#f5cb6a]">Funcionalidades</a><a href="#perguntas" className="hover:text-[#f5cb6a]">Perguntas</a>
        </nav>
        <a href="#espera" className="hidden rounded-full bg-[#f6c65f] px-5 py-2.5 text-sm font-bold text-[#061426] transition hover:bg-[#ffda85] md:inline-flex">Entrar na lista de espera <ArrowRight size={16} className="ml-2"/></a>
        <button type="button" aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)} className="md:hidden">{menu?<X/>:<Menu/>}</button>
      </div>
      {menu && <nav className="flex flex-col gap-4 border-t border-white/10 bg-[#041327] px-6 py-5 md:hidden">{[["Início","#inicio"],["Como funciona","#como-funciona"],["Funcionalidades","#funcionalidades"],["Perguntas","#perguntas"],["Lista de espera","#espera"]].map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav>}
    </div>

    <div id="inicio" className="pt-16">
      <section className="relative isolate flex min-h-[510px] items-center overflow-hidden py-14 lg:min-h-[610px]">
        <div className="absolute inset-0 -z-20 bg-[#061426]"/>
        <div className="scene-backdrop parallax-back absolute inset-0 -z-10 bg-cover bg-center opacity-90" style={{backgroundImage:"url('/scenes/01-hero.webp')"}}/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#041327]/95 via-[#041327]/70 to-[#041327]/20"/>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div className="relative z-20"><p className="mb-5 text-xs font-bold uppercase tracking-[.3em] text-[#f6c65f]">Uma nova jornada está começando</p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">Descubra histórias reais <span className="text-[#f6c65f]">que transformam sua vida</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">Odisseia Bíblica é uma aventura de perguntas e respostas que torna o aprendizado da Bíblia uma experiência envolvente e divertida.</p>
            <a href="#espera" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f6c65f] px-7 py-4 font-bold text-[#061426] shadow-xl transition hover:-translate-y-1 hover:bg-[#ffdc83]"><ArrowRight size={20}/> Entrar na lista de espera</a>
            <div className="mt-10 flex flex-wrap gap-5 text-sm text-[#f4d38c]"><span>✦ Desafios</span><span>✦ Histórias bíblicas</span><span>✦ Conquistas</span></div>
          </div>
          <div className="relative flex min-h-[280px] items-center justify-center lg:min-h-[450px]"><div className="absolute inset-[20%] rounded-full bg-[#f6c65f]/30 blur-[90px]"/><img src="/odisseia-hero.png" alt="Corujinha aventureira, mascote oficial do Odisseia Bíblica" className="parallax-foreground relative z-10 w-full max-w-[580px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,.55)]"/></div>
        </div>
      </section>
      <section id="como-funciona" className="relative isolate flex min-h-[410px] items-center overflow-hidden py-14 scroll-mt-16">
        <div className="scene-backdrop parallax-back absolute inset-0 -z-20 bg-cover bg-center" style={{backgroundImage:"url('/scenes/02-jornada.webp')"}}/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071426]/90 via-[#071426]/55 to-[#071426]/10"/>
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8"><div className="max-w-xl rounded-2xl border border-[#f6c65f]/25 bg-[#071426]/65 p-8 backdrop-blur-md md:p-12"><p className="text-xs uppercase tracking-[.3em] text-[#f6c65f]">Mais que um jogo</p><h2 className="mt-4 font-serif text-4xl md:text-6xl">Uma jornada <span className="text-[#f6c65f]">de fé</span></h2><p className="mt-5 text-lg leading-8 text-slate-200">Cada desafio superado leva você mais perto de conhecer a Palavra de Deus e viver grandes histórias.</p></div></div>
      </section>
      <section id="funcionalidades" className="relative isolate overflow-hidden bg-[#061426] py-16 scroll-mt-16">
        <div className="scene-backdrop parallax-back absolute inset-0 -z-20 bg-cover bg-center opacity-55" style={{backgroundImage:"url('/scenes/01-hero.webp')"}}/><div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#061426]/90 via-[#061426]/65 to-[#061426]/40"/>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-[340px] rotate-[-5deg] rounded-[2.8rem] border-[9px] border-[#020916] bg-[#071b35] p-4 shadow-[0_35px_90px_#0009] transition-transform hover:rotate-0"><div className="mb-5 flex items-center gap-2 text-xs text-[#f6c65f]"><img src="/odisseia-hero.png" className="h-10 w-10 object-contain" alt=""/> Odisseia Bíblica</div><img src="/scenes/02-jornada.webp" className="aspect-[4/3] w-full rounded-xl object-cover" alt="Cenário de exploração bíblica"/><p className="mt-4 font-serif text-xl">Sua jornada começa aqui</p><div className="mt-4 grid grid-cols-2 gap-2">{["Antigo Testamento","Novo Testamento","Personagens","Desafios diários"].map(x=><div key={x} className="rounded-lg border border-[#f6c65f]/20 bg-[#183656] px-2 py-4 text-center text-xs text-[#f4d38c]">{x}</div>)}</div><div className="mt-5 rounded-full bg-[#f6c65f] p-3 text-center text-sm font-bold text-[#061426]">Continuar jornada →</div></div>
          <div><p className="text-xs uppercase tracking-[.3em] text-[#f6c65f]">Aprender a Bíblia</p><h2 className="mt-4 font-serif text-5xl">Nunca foi tão <span className="text-[#f6c65f]">divertido</span></h2><p className="mt-6 text-lg leading-8 text-slate-200">Jogue, responda, explore e evolua em uma experiência feita para todas as idades.</p><div className="mt-8 grid grid-cols-2 gap-4">{["Desafios interativos","Histórias reais","Evolução em níveis","Conquistas especiais"].map(x=><div key={x} className="rounded-xl border border-[#f6c65f]/25 bg-[#061426]/65 p-5 text-sm text-[#f4d38c]">✦ {x}</div>)}</div></div>
        </div>
      </section>
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden py-14">
        <div className="scene-backdrop parallax-back absolute inset-0 -z-20 bg-cover bg-center" style={{backgroundImage:"url('/scenes/02-jornada.webp')"}}/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061426]/95 via-[#061426]/75 to-[#061426]/30"/>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 md:grid-cols-[1fr_.8fr] lg:px-8"><div><h2 className="max-w-lg font-serif text-5xl">Explore a Bíblia com um novo <span className="text-[#f6c65f]">olhar</span></h2><p className="mt-6 max-w-lg text-lg text-slate-200">Viaje por acontecimentos, descubra personagens e reviva ensinamentos que atravessam gerações.</p><img src="/odisseia-hero.png" className="parallax-foreground mt-5 w-60 object-contain md:w-80" alt="Mascote convidando para explorar a Bíblia"/></div><div className="space-y-4">{["Antigo Testamento","Novo Testamento","Personagens bíblicos"].map((x,i)=><a href="#espera" key={x} className="flex items-center justify-between rounded-xl border border-[#f6c65f]/30 bg-[#061426]/80 p-6 text-lg font-semibold backdrop-blur transition hover:translate-x-1 hover:border-[#f6c65f]"><span>{x}</span><ArrowRight className="text-[#f6c65f]"/></a>)}</div></div>
      </section>
    </div>
    <section className="relative isolate overflow-hidden py-16">
      <div className="scene-backdrop parallax-back absolute inset-0 -z-20 bg-cover bg-center" style={{backgroundImage:"url('/scenes/03-app.webp')"}}/><div className="absolute inset-0 -z-10 bg-[#061426]/75"/>
      <div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-xs uppercase tracking-[.3em] text-[#f6c65f]">Descubra cada capítulo</p><h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl">Uma experiência para <span className="text-[#f6c65f]">explorar e evoluir</span></h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[{src:"04-explorar.webp",title:"Explore novos caminhos",text:"Descubra histórias, personagens e lugares bíblicos."},{src:"05-quiz.webp",title:"Desafie seu conhecimento",text:"Aprenda com perguntas e respostas."},{src:"06-familia.webp",title:"Uma aventura para todas as idades",text:"Aprenda e compartilhe em família."},{src:"07-cta.webp",title:"Sua jornada está começando",text:"Faça parte da lista de espera."}].map(item=><a href="#espera" key={item.src} className="group relative isolate flex min-h-[215px] items-end overflow-hidden rounded-2xl border border-[#f6c65f]/25 bg-[#102a46]">
            <img src={"/scenes/"+item.src} loading="lazy" alt={item.title} className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/><div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061426] via-[#061426]/35 to-transparent"/>
            <div className="p-7"><h3 className="font-serif text-2xl text-white">{item.title}</h3><p className="mt-2 text-sm text-slate-200">{item.text}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f6c65f]">Conhecer a jornada <ArrowRight size={16}/></span></div>
          </a>)}
        </div>
      </div>
    </section>
    <section aria-label="Experimente um desafio" className="relative border-y border-[#f4c86a]/20 bg-[#081b31] bg-cover bg-center px-5 py-16" style={{backgroundImage:"linear-gradient(90deg,rgba(6,20,38,.95),rgba(6,20,38,.8)),url(/scenes/05-quiz.webp)"}}>
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#f4c86a]">Uma experiência interativa</p><h2 className="mt-3 font-serif text-4xl">Pequenas perguntas.<br/><span className="text-[#f4c86a]">Grandes aprendizados.</span></h2><p className="mt-5 leading-7 text-slate-300">Teste seus conhecimentos e descubra como aprender a Bíblia pode ser divertido.</p></div>
        <div className="rounded-2xl border border-[#f4c86a]/25 bg-[#102a46] p-6 shadow-2xl"><p className="text-sm text-[#f4c86a]">Desafio bíblico</p><h3 className="mt-3 mb-5 font-serif text-2xl">Qual é o maior mandamento?</h3><div className="space-y-2">{["Amar a Deus","Ser o primeiro","Vencer inimigos","Construir um templo"].map((item,i)=><button type="button" key={item} onClick={()=>setAnswer(i)} aria-pressed={answer===i} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition hover:border-[#f4c86a] ${answer===i?(i===0?"border-emerald-400 bg-emerald-500/20":"border-rose-400 bg-rose-500/15"):"border-white/15 bg-white/5"}`}><span>{String.fromCharCode(65+i)}. {item}</span>{answer===i&&i===0&&<CheckCircle2 size={18} className="text-emerald-400"/>}</button>)}</div>{answer!==null&&<p role="status" className="mt-4 text-sm text-[#f4c86a]">{answer===0?"Correto! Veja Mateus 22:37–38.":"Tente novamente! Uma dica: veja Mateus 22:37–38."}</p>}</div>
      </div>
    </section>
    <section id="espera" className="scroll-mt-16 bg-cover bg-center px-5 py-20" style={{backgroundImage:"linear-gradient(90deg,rgba(6,20,38,.95),rgba(6,20,38,.83)),url(/scenes/07-cta.webp)"}}>
      <div className="mx-auto max-w-xl text-center"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#f4c86a]">Faça parte dessa jornada</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Entre na <span className="text-[#f4c86a]">lista de espera</span></h2><p className="mt-5 text-slate-300">Seja um dos primeiros a receber novidades do Odisseia Bíblica.</p>
      {state==="done"?<p role="status" className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6">Cadastro recebido! Acompanhe seu e-mail.</p>:<form onSubmit={subscribe} className="mt-8 space-y-3 text-left"><label htmlFor="nome" className="block text-sm">Nome</label><input id="nome" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border border-white/20 bg-[#102a46] px-4 py-3 outline-none focus:border-[#f4c86a]" placeholder="Seu nome"/><label htmlFor="email" className="block text-sm">E-mail</label><input id="email" required type="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-white/20 bg-[#102a46] px-4 py-3 outline-none focus:border-[#f4c86a]" placeholder="voce@exemplo.com"/><button disabled={state==="sending"} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f6c65f] px-5 py-4 font-bold text-[#061426] transition hover:bg-[#ffda85] disabled:opacity-50">{state==="sending"?"Enviando...":"Entrar na lista de espera"}<ArrowRight size={18}/></button>{state==="error"&&<p role="alert" className="text-sm text-rose-300">{error}</p>}<p className="text-center text-xs text-slate-400">Seus dados serão utilizados para novidades do projeto.</p></form>}</div>
    </section>
    <footer className="border-t border-white/10 bg-[#04101e] px-5 py-8 text-center text-sm text-slate-400">ODISSEIA BÍBLICA · Jogue • Aprenda • Viva a Palavra</footer>
  </main>;
}
