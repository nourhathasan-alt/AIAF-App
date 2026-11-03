import type { ReactNode } from 'react';
import { fullName, fmtDate, SNAPSHOT_DATE } from './data';
import type { Block, Lang } from './engine';

const MAX = 12;

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((p, i) => p.startsWith('**') ? <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>)}</>;
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="w-full overflow-x-auto rounded-lg border border-border bg-background/60">{children}</div>;
}

export function BotBlocks({ blocks, lang, onAsk }: { blocks: Block[]; lang: Lang; onAsk: (q: string) => void }) {
  const no = lang === 'no';
  return (
    <div className="flex min-w-0 flex-col gap-3 text-sm leading-relaxed">
      {blocks.map((b, i) => {
        if (b.kind === 'text') return <p key={i}><Rich text={b.text} /></p>;
        if (b.kind === 'list') return (
          <ul key={i} className="flex flex-col gap-1.5 pl-1">
            {b.items.map((it, j) => <li key={j} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span className="min-w-0 break-words"><Rich text={it} /></span></li>)}
          </ul>
        );
        if (b.kind === 'chips') return (
          <div key={i} className="flex flex-wrap gap-2">
            {b.items.map((c) => <button key={c} onClick={() => onAsk(c)} className="rounded-full border border-primary/30 bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">{c}</button>)}
          </div>
        );
        if (b.kind === 'depts') return (
          <Frame key={i}>
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground"><tr><th className="px-3 py-2 font-medium">{no ? 'Avdeling' : 'Department'}</th><th className="px-3 py-2 font-medium">{no ? 'Kode' : 'Code'}</th><th className="px-3 py-2 text-right font-medium">{no ? 'Ansatte' : 'Employees'}</th><th className="px-3 py-2 text-right font-medium">{no ? 'Aktive' : 'Active'}</th></tr></thead>
              <tbody>{b.rows.map((r) => <tr key={r.code} className="border-t border-border"><td className="px-3 py-2 font-medium">{r.name}</td><td className="px-3 py-2 font-mono text-muted-foreground">{r.code}</td><td className="px-3 py-2 text-right tabular-nums">{r.count}</td><td className="px-3 py-2 text-right tabular-nums">{r.active}</td></tr>)}</tbody>
            </table>
          </Frame>
        );
        if (b.kind === 'table') {
          const shown = b.rows.slice(0, MAX);
          return (
            <div key={i} className="flex flex-col gap-2">
              <Frame>
                <table className="w-full min-w-[620px] text-left text-xs">
                  <thead className="bg-muted text-muted-foreground"><tr>{(no ? ['Navn', 'Stilling', 'Avdeling', 'E-post', 'Telefon'] : ['Name', 'Position', 'Department', 'Email', 'Phone']).map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr></thead>
                  <tbody>{shown.map((e) => (
                    <tr key={e.eid} className="border-t border-border">
                      <td className="whitespace-nowrap px-3 py-2 font-medium">{fullName(e)}{e.status === 'terminated' && <span className="ml-1.5 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive">{no ? 'oppsagt' : 'terminated'}</span>}{e.type === 'part_time' && <span className="ml-1.5 rounded bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">{no ? 'deltid' : 'part-time'}</span>}</td>
                      <td className="px-3 py-2">{e.pos}</td><td className="px-3 py-2">{e.dept}</td>
                      <td className="px-3 py-2"><a className="text-primary hover:underline" href={`mailto:${e.email}`}>{e.email}</a></td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">{e.phone}</td>
                    </tr>))}</tbody>
                </table>
              </Frame>
              {b.rows.length > MAX && <p className="text-xs text-muted-foreground">{no ? `Viser ${MAX} av totalt ${b.rows.length} ansatte.` : `Showing ${MAX} of ${b.rows.length} employees in total.`}</p>}
            </div>
          );
        }
        const e = b.emp;
        const years = ((+new Date(SNAPSHOT_DATE) - +new Date(e.hired)) / 3.156e10).toFixed(1);
        const rows: [string, string][] = [
          [no ? 'Ansatt-ID' : 'Employee ID', String(e.eid)], [no ? 'Stilling' : 'Position', e.pos], [no ? 'Avdeling' : 'Department', e.dept],
          ['Type', e.type === 'full_time' ? (no ? 'Heltid' : 'Full-time') : (no ? 'Deltid' : 'Part-time')],
          ['Status', e.status === 'active' ? (no ? 'Aktiv' : 'Active') : (no ? 'Oppsagt' : 'Terminated')],
          [no ? 'Ansatt dato' : 'Hire date', `${fmtDate(e.hired)} (${years} ${no ? 'år' : 'yrs'})`], [no ? 'Sluttdato' : 'End date', fmtDate(e.ended)],
          [no ? 'E-post' : 'Email', e.email], [no ? 'Telefon' : 'Phone', e.phone],
        ];
        return (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-background/60">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{e.fn[0]}{e.ln[0]}</div>
              <div className="min-w-0"><p className="truncate font-semibold">{fullName(e)}</p><p className="truncate text-xs text-muted-foreground">{e.pos} · {e.dept}</p></div>
            </div>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-2 px-4 py-3 text-xs sm:grid-cols-2">
              {rows.map(([k, v]) => <div key={k} className="flex min-w-0 justify-between gap-3 sm:block"><dt className="text-muted-foreground">{k}</dt><dd className="truncate font-medium">{v}</dd></div>)}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
