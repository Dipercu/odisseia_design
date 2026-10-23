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
  const [imageReady, setImageReady] = useState(true);
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

    <div className="mx-auto w-full max-w-[1600px] pt-16">
      {imageReady ? <div className="relative w-full overflow-hidden">
        <img src="/odisseia-layout.webp" alt="Odisseia Bíblica: aventura cinematográfica com mascote corujinha, cenários bíblicos, desafios, conquistas, comunidade e lista de espera" className="block h-auto w-full" onError={()=>setImageReady(false)} />
        <div id="inicio" className="absolute left-0 top-0 h-[20.8%] w-full scroll-mt-20" aria-hidden="true"/>
        <div id="como-funciona" className="absolute left-0 top-[20.8%] h-[25.5%] w-full scroll-mt-20" aria-hidden="true"/>
        <div id="funcionalidades" className="absolute left-0 top-[46.3%] h-[23.9%] w-full scroll-mt-20" aria-hidden="true"/>
        <div id="perguntas" className="absolute left-0 top-[58.3%] h-[12%] w-full scroll-mt-20" aria-hidden="true"/>
        <a href="#espera" aria-label="Entrar na lista de espera" className="absolute left-[7%] top-[13.9%] h-[3.6%] w-[30%] rounded-full outline-offset-4 focus-visible:outline-4 focus-visible:outline-[#ffdd85]"/>
        <a href="#espera" aria-label="Entrar na lista de espera" className="absolute left-[47%] top-[89.4%] h-[2.6%] w-[32%] rounded-full outline-offset-4 focus-visible:outline-4 focus-visible:outline-[#ffdd85]"/>
      </div> : <div className="flex min-h-[65vh] flex-col items-center justify-center gap-5 px-6 text-center"><img src="/odisseia-hero.png" className="w-52" alt="Mascote Odisseia Bíblica"/><h1 className="font-serif text-4xl text-[#f4d38c]">Uma nova jornada está chegando</h1><p className="max-w-xl text-slate-300">Adicione o arquivo odisseia-layout.webp na pasta public para exibir o layout cinematográfico aprovado.</p><a href="#espera" className="rounded-xl bg-[#f6c65f] px-6 py-3 font-bold text-[#061426]">Lista de espera</a></div>}
    </div>

    <section aria-label="Experimente um desafio" className="relative border-y border-[#f4c86a]/20 bg-[#081b31] px-5 py-16">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#f4c86a]">Uma experiência interativa</p><h2 className="mt-3 font-serif text-4xl">Pequenas perguntas.<br/><span className="text-[#f4c86a]">Grandes aprendizados.</span></h2><p className="mt-5 leading-7 text-slate-300">Teste seus conhecimentos e descubra como aprender a Bíblia pode ser divertido.</p></div>
        <div className="rounded-2xl border border-[#f4c86a]/25 bg-[#102a46] p-6 shadow-2xl"><p className="text-sm text-[#f4c86a]">Desafio bíblico</p><h3 className="mt-3 mb-5 font-serif text-2xl">Qual é o maior mandamento?</h3><div className="space-y-2">{["Amar a Deus","Ser o primeiro","Vencer inimigos","Construir um templo"].map((item,i)=><button type="button" key={item} onClick={()=>setAnswer(i)} aria-pressed={answer===i} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition hover:border-[#f4c86a] ${answer===i?(i===0?"border-emerald-400 bg-emerald-500/20":"border-rose-400 bg-rose-500/15"):"border-white/15 bg-white/5"}`}><span>{String.fromCharCode(65+i)}. {item}</span>{answer===i&&i===0&&<CheckCircle2 size={18} className="text-emerald-400"/>}</button>)}</div>{answer!==null&&<p role="status" className="mt-4 text-sm text-[#f4c86a]">{answer===0?"Correto! Veja Mateus 22:37–38.":"Tente novamente! Uma dica: veja Mateus 22:37–38."}</p>}</div>
      </div>
    </section>
    <section id="espera" className="scroll-mt-16 bg-[radial-gradient(ellipse_at_top,#254461,#061426_65%)] px-5 py-20">
      <div className="mx-auto max-w-xl text-center"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#f4c86a]">Faça parte dessa jornada</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Entre na <span className="text-[#f4c86a]">lista de espera</span></h2><p className="mt-5 text-slate-300">Seja um dos primeiros a receber novidades do Odisseia Bíblica.</p>
      {state==="done"?<p role="status" className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6">Cadastro recebido! Acompanhe seu e-mail.</p>:<form onSubmit={subscribe} className="mt-8 space-y-3 text-left"><label htmlFor="nome" className="block text-sm">Nome</label><input id="nome" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border border-white/20 bg-[#102a46] px-4 py-3 outline-none focus:border-[#f4c86a]" placeholder="Seu nome"/><label htmlFor="email" className="block text-sm">E-mail</label><input id="email" required type="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-white/20 bg-[#102a46] px-4 py-3 outline-none focus:border-[#f4c86a]" placeholder="voce@exemplo.com"/><button disabled={state==="sending"} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f6c65f] px-5 py-4 font-bold text-[#061426] transition hover:bg-[#ffda85] disabled:opacity-50">{state==="sending"?"Enviando...":"Entrar na lista de espera"}<ArrowRight size={18}/></button>{state==="error"&&<p role="alert" className="text-sm text-rose-300">{error}</p>}<p className="text-center text-xs text-slate-400">Seus dados serão utilizados para novidades do projeto.</p></form>}</div>
    </section>
    <footer className="border-t border-white/10 bg-[#04101e] px-5 py-8 text-center text-sm text-slate-400">ODISSEIA BÍBLICA · Jogue • Aprenda • Viva a Palavra</footer>
  </main>;
}
