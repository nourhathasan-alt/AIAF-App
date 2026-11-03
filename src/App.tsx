import { useEffect, useRef, useState } from 'react';
import { Bot, SendHorizontal, Users } from 'lucide-react';
import { DEPARTMENTS, EMPLOYEES } from './data';
import { answer, SUGGEST_NO, type Answer } from './engine';
import { BotBlocks } from './BotBlocks';

type Msg = { id: number; role: 'user'; text: string } | { id: number; role: 'bot'; ans: Answer };

const WELCOME: Answer = { lang: 'no', blocks: [
  { kind: 'text', text: 'Hei! Jeg er **Axaz HR Assistant**. Spør meg om ansatte og avdelinger i Bjorkas — på norsk eller engelsk.' },
] };

export default function App() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'bot', ans: WELCOME }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const total = EMPLOYEES.length;
  const active = EMPLOYEES.filter((e) => e.status === 'active').length;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { id: Date.now(), role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      let ans: Answer;
      try { ans = answer(text); } catch (e) { console.error(e); ans = { lang: 'no', blocks: [{ kind: 'text', text: 'Noe gikk galt. Prøv igjen.' }] }; }
      setMsgs((m) => [...m, { id: Date.now() + 1, role: 'bot', ans }]);
      setTyping(false);
    }, 350);
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"><Users className="h-5 w-5" /></div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Axaz HR Assistant</h1>
              <p className="text-xs text-muted-foreground">Bjorkas • data per 03.11.2026</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[['Totalt', total], ['Aktive', active], ['Avdelinger', DEPARTMENTS.length]].map(([k, v]) => (
              <span key={k} className="rounded-full border border-border bg-background px-3 py-1"><span className="text-muted-foreground">{k}: </span><span className="font-semibold tabular-nums">{v}</span></span>
            ))}
          </div>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-6">
          {msgs.map((m) => m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm">{m.text}</div>
            </div>
          ) : (
            <div key={m.id} className="flex gap-2.5">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-card text-primary shadow-sm"><Bot className="h-4 w-4" /></div>
              <div className="min-w-0 max-w-[92%] rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 shadow-sm">
                <BotBlocks blocks={m.ans.blocks} lang={m.ans.lang} onAsk={ask} />
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2.5">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-card text-primary"><Bot className="h-4 w-4" /></div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3">
                {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 120}ms` }} />)}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </main>

      <footer className="shrink-0 border-t border-border bg-card/90">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {SUGGEST_NO.map((s) => (
              <button key={s} onClick={() => ask(s)} className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground">{s}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex items-center gap-2 rounded-2xl border border-input bg-background p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-ring/30">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Still et spørsmål om ansatte eller avdelinger…" aria-label="Spørsmål" className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground" />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="grid h-10 w-11 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"><SendHorizontal className="h-4 w-4" /></button>
          </form>
        </div>
      </footer>
    </div>
  );
}
