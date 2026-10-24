import { ArrowRight, Check } from "lucide-react";
import bg_learn from "@/assets/info-learn.webp";
import bg_care from "@/assets/info-care.webp";
import bg_plans from "@/assets/info-plans.webp";
import fun_bau from "@/assets/fun-bau.webp";
import fun_perolas from "@/assets/fun-perolas.webp";
import fun_escudo from "@/assets/fun-escudo.webp";
import fun_liga from "@/assets/fun-liga.webp";
import fun_pergaminho from "@/assets/fun-pergaminho.webp";
import fun_pedras from "@/assets/fun-pedras.webp";

function Bg({ src, children }: { src: string; children: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20">
      <img src={src} loading="lazy" decoding="async" width={1920} height={1088} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-navy-deep/60" aria-hidden />
      {children}
    </section>
  );
}

function Plain({ children }: { children: React.ReactNode }) {
  return <section className="py-14 md:py-20">{children}</section>;
}

const stats = [
  ["7.050", "perguntas com versículo"],
  ["66", "livros, do Gênesis ao Apocalipse"],
  ["5 min", "por dia é o suficiente"],
  ["77", "idiomas na tela do App"],
];

const learn = [
  ["Maná do Dia", "Sete perguntas novas por dia, as mesmas para o mundo inteiro. Volte amanhã para manter a sua sequência de dias."],
  ["Uma jornada pela Bíblia", "Fases que seguem a história bíblica, da criação à igreja de Atos. Cada fase concluída revela uma ilustração."],
  ["Toda resposta tem versículo", "Depois de responder, você lê onde está escrito e uma explicação curta. Com um toque, abre o capítulo na Bíblia."],
];

const fun = [
  ["Baú do dia", "Todo dia, escolha 1 de 3 baús e descubra o prêmio.", fun_bau],
  ["Pérolas e níveis", "Suba do nível Semente ao Celeiro conforme aprende.", fun_perolas],
  ["Ajudas na hora do aperto", "Cartas que cortam alternativas, Pular e a ajuda dos Sacerdotes.", fun_escudo],
  ["Liga da semana", "Ranking com pessoas do mundo todo, recomeça toda segunda.", fun_liga],
  ["Quem disse?", "Frases famosas da Bíblia: adivinhe quem falou.", fun_pergaminho],
  ["Ordem dos fatos", "Monte a linha do tempo: o que aconteceu primeiro?", fun_pedras],
];

const care = [
  ["Toda resposta vem de um versículo", "A resposta certa sempre está escrita na Bíblia, com o lugar citado."],
  ["Para todas as igrejas", "Nada de temas que dividem denominações. O foco é o texto bíblico."],
  ["Bíblia completa grátis", "Leia qualquer livro e capítulo dentro do App, com busca por palavra."],
  ["Voz natural que lê para você", "Ótimo para quem prefere ouvir ou para aprender em família."],
  ["Reportar pergunta", "Achou algo estranho? Um toque avisa a nossa equipe para revisar."],
];

const audience = [
  ["Você", "Cinco minutos no café da manhã ou antes de dormir, e a Bíblia fica cada vez mais conhecida."],
  ["A família", "No Modo família, o celular passa de mão em mão. Pais, filhos e avós se divertem juntos."],
  ["A igreja", "Na Sala ao vivo, até 300 pessoas entram com um código e disputam o placar em tempo real."],
];

const plans = [
  { name: "Grátis", tag: "", price: "R$ 0", note: "Para sempre, sem cartão", items: ["Maná do Dia todos os dias", "Trilha Fundamentos com 900 perguntas", "Bíblia completa e voz que lê para você", "Quem disse, Ordem dos fatos e Modo família"] },
  { name: "Premium", tag: "7 dias grátis", price: "R$ 9,90 por mês", note: "ou R$ 79,90 por ano (sai por R$ 6,66 ao mês)", items: ["Tudo do plano grátis", "Trilha Aprofundado: 2.400 perguntas", "Trilha Mestre: 3.750 perguntas", "Liga da semana e Modo desafio com cronômetro", "Sala ao vivo para a igreja", "Vidas sem limite e ajudas extras", "Progresso salvo na nuvem, em vários aparelhos"] },
];

const faq = [
  ["É de alguma igreja ou denominação?", "Não. O App foi feito para cristãos de todas as igrejas. As perguntas tratam do que está escrito na Bíblia e evitam temas que dividem denominações."],
  ["Qual Bíblia o App usa?", "Para leitura, a Bíblia Livre, uma tradução em português de uso livre. Quando um nome ou número muda entre traduções, a pergunta avisa."],
  ["Serve para crianças?", "O App é para maiores de 13 anos aprenderem sozinhos. Com os pais por perto, o Modo família é ótimo para crianças: o celular passa de mão em mão e todos aprendem juntos."],
  ["Funciona em outros idiomas?", "A tela do App está em 77 idiomas. As perguntas completas estão em português, inglês, espanhol, francês, italiano, alemão, russo e tagalo."],
  ["O que acontece com os meus dados?", "Para começar você não precisa de conta. Se criar uma, guardamos só o necessário para salvar o progresso e a assinatura."],
];

function Head({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-gold">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Cards({ list, cols }: { list: string[][]; cols: string }) {
  return (
    <div className={`mt-10 grid gap-5 ${cols}`}>
      {list.map(([t, d, icon]) => (
        <div key={t} className="rounded-2xl border border-gold/20 bg-navy-deep/75 backdrop-blur-sm p-6 transition hover:border-gold/60">
          {icon && <img src={icon} alt="" aria-hidden loading="lazy" decoding="async" width={64} height={64} className="mb-3 h-16 w-16 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)]" />}
          <h3 className="font-display text-lg text-gold">{t}</h3>
          <p className="mt-2 text-sm leading-6 text-foreground/85">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function SiteInfo() {
  const wrap = "mx-auto w-full max-w-7xl px-5 lg:px-8";
  return (
    <div className="bg-navy-deep">
      <section className="border-y border-gold/15 py-10">
        <div className={`${wrap} grid grid-cols-2 gap-6 text-center md:grid-cols-4`}>
          {stats.map(([n, l]) => (
            <div key={l}><b className="block font-display text-3xl text-gold md:text-4xl">{n}</b><span className="text-xs uppercase tracking-wider text-foreground/75">{l}</span></div>
          ))}
        </div>
      </section>

      <Bg src={bg_learn}><div className={wrap}>
        <Head kicker="Como você aprende" title="Um pouquinho todo dia vira conhecimento para a vida" />
        <Cards list={learn} cols="md:grid-cols-3" />
      </div></Bg>

      <Plain><div className={wrap}>
        <Head kicker="O lado divertido" title="Aprender a Bíblia é pura diversão" />
        <Cards list={fun} cols="sm:grid-cols-2 lg:grid-cols-3" />
      </div></Plain>

      <Bg src={bg_care}><div className={wrap}>
        <Head kicker="Feito com cuidado" title="Divertido, sem perder a fidelidade" />
        <Cards list={care} cols="sm:grid-cols-2 lg:grid-cols-5" />
      </div></Bg>

      <Plain><div className={wrap}>
        <Head kicker="Para quem é" title="Para aprender sozinho, em família ou na igreja" />
        <Cards list={audience} cols="md:grid-cols-3" />
      </div></Plain>

      <Bg src={bg_plans}><div className={wrap}>
        <Head kicker="Planos" title="Comece grátis. Vá mais fundo quando quiser." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-7 ${p.tag ? "border-gold bg-navy-deep/80 backdrop-blur-sm" : "border-gold/20 bg-navy-deep/75 backdrop-blur-sm"}`}>
              {p.tag && <span className="text-xs font-semibold uppercase tracking-wider text-gold">{p.tag}</span>}
              <h3 className="mt-1 font-display text-2xl">{p.name}</h3>
              <p className="mt-2 text-2xl font-semibold text-gold">{p.price}</p>
              <p className="text-xs text-foreground/70">{p.note}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.items.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-gold" />{i}</li>)}
              </ul>
              <a href="#espera" className="btn-gold mt-6 w-full justify-center px-5 py-3 text-xs">Baixe o Aplicativo <ArrowRight size={16} /></a>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-foreground/70">Cancele quando quiser. Na Sala ao vivo, só quem cria a sala precisa ser Premium; quem entra aprende de graça.</p>
      </div></Bg>

      <Plain><div className={wrap}>
        <Head kicker="Dúvidas" title="Perguntas frequentes" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faq.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-gold/20 bg-navy-deep/75 backdrop-blur-sm p-5 open:border-gold/60">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">{q}</summary>
              <p className="mt-3 text-sm leading-6 text-foreground/85">{a}</p>
            </details>
          ))}
        </div>
      </div></Plain>
    </div>
  );
}
