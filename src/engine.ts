import { DEPARTMENTS, EMPLOYEES, fullName, fmtDate, type Employee } from './data';

export type Lang = 'no' | 'en';
export type DeptRow = { name: string; code: string; count: number; active: number };
export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; rows: Employee[] }
  | { kind: 'profile'; emp: Employee }
  | { kind: 'depts'; rows: DeptRow[] }
  | { kind: 'chips'; items: string[] };
export interface Answer { lang: Lang; blocks: Block[] }

const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const NO_WORDS = new Set('hvor hvem hva mange ansatte ansatt alle finn avdeling avdelinger jobber fortell om til etter før deltid deltidsansatte heltid nyeste lengst flest er det og med finnes antall vis oppsagt oppsagte sagte sluttet hvilke siste eldste hvordan bygget nummer telefonnummer epost e-posten personer folk'.split(' '));
const EN_WORDS = new Set('who how many what show find list all employees employee people work works in is the of after before hired part time most longest recent terminated departments department phone number email tell about which are there me give organization built'.split(' '));

export function detectLang(q: string): Lang {
  const w = q.toLowerCase().match(/[\p{L}-]+/gu) ?? [];
  let no = /[æøå]/i.test(q) ? 2 : 0, en = 0;
  for (const x of w) { if (NO_WORDS.has(x)) no++; if (EN_WORDS.has(x)) en++; }
  return en > no ? 'en' : 'no';
}

const DEPT_ALIASES: Record<string, string[]> = {
  Administration: ['administrasjon', 'ledelse'], Construction: ['bygg', 'anlegg'], 'Customer Success': ['kundeservice', 'kundesuksess'],
  Finance: ['økonomi', 'finans'], HSE: ['hms'], 'Human Resources': ['personal', ' hr '], IT: [], Marketing: ['markedsføring', 'marked'],
  Production: ['produksjon'], Quality: ['kvalitet'], Sales: ['salg'], Warehouse: ['lager'],
};
const POS_KEYS: Record<string, string> = {
  manager: 'manager', leder: 'manager', sjef: 'manager', developer: 'developer', utvikler: 'developer', worker: 'worker', arbeider: 'worker',
  operator: 'operator', operatør: 'operator', analyst: 'analyst', analytiker: 'analyst', specialist: 'specialist', spesialist: 'specialist',
  director: 'director', direktør: 'director', coordinator: 'coordinator', koordinator: 'coordinator', officer: 'officer', inspector: 'inspector',
  inspektør: 'inspector', representative: 'representative', associate: 'associate', executive: 'executive', supervisor: 'supervisor',
  receptionist: 'receptionist', resepsjonist: 'receptionist', auditor: 'auditor', revisor: 'auditor', controller: 'controller', lead: 'lead',
};
const NAME_STOP = new Set(['test', 'best', 'van']);
const POSITIONS = [...new Set(EMPLOYEES.map((e) => e.pos))];
const nameTokens = (e: Employee) => fold(fullName(e)).split(/[^\p{L}]+/u).filter((t) => t.length >= 3 && !NAME_STOP.has(t));

function parse(q: string) {
  const ql = ` ${q.toLowerCase()} `;
  const words: string[] = fold(q).match(/[\p{L}\p{N}]+/gu) ?? [];
  const rawWords: string[] = q.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  // positions
  let fullPos = POSITIONS.filter((p) => ql.includes(p.toLowerCase()));
  let positions = fullPos;
  if (!positions.length) {
    const terms = new Set<string>();
    for (const [k, t] of Object.entries(POS_KEYS))
      if (rawWords.some((w) => [k, k + 's', k + 'e', k + 'er', k + 'ere'].includes(w))) terms.add(t);
    positions = POSITIONS.filter((p) => [...terms].some((t) => p.toLowerCase().includes(t)));
    fullPos = [];
  }
  // departments
  let depts = DEPARTMENTS.filter((d) => {
    if (d.code === 'IT') return /\bIT\b/.test(q) || /\b(i|in|på)\s+it\b/i.test(q);
    if (ql.includes(d.name.toLowerCase())) return true;
    if ((DEPT_ALIASES[d.name] ?? []).some((a) => ql.includes(a))) return true;
    return rawWords.includes(d.code.toLowerCase());
  });
  if (/\bhr\b/i.test(q) && !depts.some((d) => d.name === 'Human Resources')) depts.push(DEPARTMENTS.find((d) => d.name === 'Human Resources')!);
  depts = depts.filter((d) => !fullPos.some((p) => p.toLowerCase().includes(d.name.toLowerCase())));
  // names
  const scored = EMPLOYEES.map((e) => ({ e, s: nameTokens(e).filter((t) => words.includes(t)).length }));
  const max = Math.max(...scored.map((x) => x.s));
  const names = max > 0 ? scored.filter((x) => x.s === max).map((x) => x.e) : [];
  // type/status/year
  const type = /part[\s-]?tim|deltid/i.test(q) ? 'part_time' : /full[\s-]?tim|heltid/i.test(q) ? 'full_time' : null;
  const status = /terminat|oppsagt|opp ?sagte|sagt opp|sluttet|fired|former|tidligere/i.test(q) ? 'terminated' : /\bactive\b|\baktiv|current|nåværende/i.test(q) ? 'active' : null;
  let year: { op: '>' | '>=' | '<' | '='; y: number } | null = null;
  const m1 = q.match(/(after|etter)\s+(\d{4})/i), m2 = q.match(/(since|siden|fra)\s+(\d{4})/i), m3 = q.match(/(before|før|until)\s+(\d{4})/i), m4 = q.match(/\b(19|20)\d{2}\b/);
  if (m1) year = { op: '>', y: +m1[2] }; else if (m2) year = { op: '>=', y: +m2[2] }; else if (m3) year = { op: '<', y: +m3[2] }; else if (m4) year = { op: '=', y: +m4[0] };
  return { depts, positions, names, type, status, year };
}

const T = (lang: Lang, no: string, en: string) => (lang === 'no' ? no : en);
export const SUGGEST_NO = ['Hvor mange ansatte er det?', 'Hvem er CFO-en?', 'Alle i Sales', 'Hvilke avdelinger finnes?', 'Deltidsansatte', 'Ansatte etter 2020'];
export const SUGGEST_EN = ['How many people work in IT?', 'Who is the CFO?', 'Show employees in Sales', 'Who has been terminated?', 'Longest tenured employee', 'Phone number of the CTO'];

function deptRows(): DeptRow[] {
  return DEPARTMENTS.map((d) => {
    const es = EMPLOYEES.filter((e) => e.dept === d.name);
    return { ...d, count: es.length, active: es.filter((e) => e.status === 'active').length };
  });
}

export function answer(q: string): Answer {
  const lang = detectLang(q);
  const p = parse(q);
  const t = (no: string, en: string) => T(lang, no, en);
  const has = (re: RegExp) => re.test(q);
  const isCount = has(/hvor mange|antall|how many|number of (people|employees|staff|departments)|\bcount\b|totalt/i);
  const isContact = has(/e-?post|e-?mail|\bmail|telefon|phone|mobil|kontakt|contact/i);
  const isDeptQ = has(/avdeling|department|organi[sz]|struktur|structure/i);
  const isOld = has(/lengst|longest|eldste|oldest|most senior|ansiennitet|first hired|først ansatt/i);
  const isNew = has(/nyeste|newest|most recent|latest|sist ansatt|siste|recent|nylig/i);
  const isMost = has(/flest|most (people|employees|staff)|largest|biggest|største|størst/i);
  const isLeast = has(/færrest|fewest|smallest|minste|minst/i);
  const plural = has(/ansatte|employees|hires|people|folk|personer/i);

  if ((isDeptQ || isMost || isLeast) && !p.depts.length && (isMost || isLeast) && !p.positions.length) {
    const rows = deptRows().sort((a, b) => b.count - a.count);
    const target = isMost ? rows[0]!.count : rows[rows.length - 1]!.count;
    const hits = rows.filter((r) => r.count === target).map((r) => r.name).join(', ');
    return { lang, blocks: [{ kind: 'text', text: isMost ? t(`Avdelingen med flest ansatte er **${hits}** med ${target} personer.`, `The department with the most employees is **${hits}** with ${target} people.`) : t(`Avdelingen med færrest ansatte er **${hits}** med ${target} personer.`, `The department with the fewest employees is **${hits}** with ${target} people.`) }, { kind: 'depts', rows }] };
  }
  const anyFilter = p.depts.length || p.positions.length || p.names.length || p.type || p.status || p.year;
  if (isDeptQ && !p.depts.length && !p.names.length && !p.positions.length) {
    return { lang, blocks: [{ kind: 'text', text: t(`Bjorkas har **${DEPARTMENTS.length} avdelinger** med totalt ${EMPLOYEES.length} ansatte:`, `Bjorkas has **${DEPARTMENTS.length} departments** with ${EMPLOYEES.length} employees in total:`) }, { kind: 'depts', rows: deptRows() }] };
  }

  let rows = EMPLOYEES.filter((e) =>
    (!p.depts.length || p.depts.some((d) => d.name === e.dept)) &&
    (!p.positions.length || p.positions.includes(e.pos)) &&
    (!p.names.length || p.names.includes(e)) &&
    (!p.type || e.type === p.type) && (!p.status || e.status === p.status) &&
    (!p.year || (() => { const y = +e.hired.slice(0, 4); const { op, y: v } = p.year!; return op === '>' ? y > v : op === '>=' ? y >= v : op === '<' ? y < v : y === v; })()));

  const parts: string[] = [];
  if (p.depts.length) parts.push(t('i ', 'in ') + p.depts.map((d) => d.name).join('/'));
  if (p.positions.length && !p.names.length) parts.push(t('stilling: ', 'position: ') + p.positions.join(', '));
  if (p.type) parts.push(p.type === 'part_time' ? t('deltid', 'part-time') : t('heltid', 'full-time'));
  if (p.status) parts.push(p.status === 'active' ? t('aktive', 'active') : t('oppsagt', 'terminated'));
  if (p.year) { const w = { '>': t('ansatt etter', 'hired after'), '>=': t('ansatt fra', 'hired since'), '<': t('ansatt før', 'hired before'), '=': t('ansatt i', 'hired in') }[p.year.op]; parts.push(`${w} ${p.year.y}`); }
  const desc = parts.join(', ');
  const none: Answer = { lang, blocks: [{ kind: 'text', text: t(`Fant ingen ansatte (${desc || 'ingen treff'}).`, `No employees found (${desc || 'no match'}).`) }] };

  if (isContact && (p.names.length || p.positions.length)) {
    if (!rows.length) return none;
    const wantEmail = has(/e-?post|e-?mail|\bmail/i), wantPhone = has(/telefon|phone|mobil/i);
    const items = rows.slice(0, 12).map((e) => {
      const bits = [];
      if (wantEmail || !wantPhone) bits.push(`${t('E-post', 'Email')}: ${e.email}`);
      if (wantPhone || !wantEmail) bits.push(`${t('Telefon', 'Phone')}: ${e.phone}`);
      return `**${fullName(e)}** (${e.pos}) → ${bits.join(' · ')}`;
    });
    return { lang, blocks: [{ kind: 'text', text: t('Kontaktinformasjon:', 'Contact details:') }, { kind: 'list', items }] };
  }
  if (isOld || isNew) {
    if (!rows.length) return none;
    const sorted = [...rows].sort((a, b) => (isOld ? a.hired.localeCompare(b.hired) : b.hired.localeCompare(a.hired)));
    const scope = desc ? ` (${desc})` : '';
    if (plural) return { lang, blocks: [{ kind: 'text', text: isOld ? t(`De som har vært ansatt lengst${scope}:`, `Longest tenured employees${scope}:`) : t(`De nyeste ansatte${scope}:`, `Most recent hires${scope}:`) }, { kind: 'table', rows: sorted.slice(0, 5) }] };
    const top = sorted.filter((e) => e.hired === sorted[0]!.hired);
    const names = top.map((e) => `**${fullName(e)}** (${e.pos}, ${e.dept})`).join(t(' og ', ' and '));
    return { lang, blocks: [{ kind: 'text', text: isOld ? t(`Lengst ansatt${scope} er ${names}, ansatt ${fmtDate(top[0]!.hired)}.`, `Longest tenured${scope}: ${names}, hired ${fmtDate(top[0]!.hired)}.`) : t(`Sist ansatt${scope} er ${names}, ansatt ${fmtDate(top[0]!.hired)}.`, `Most recent hire${scope}: ${names}, hired ${fmtDate(top[0]!.hired)}.`) }, ...(top.length === 1 ? [{ kind: 'profile', emp: top[0]! } as Block] : [])] };
  }
  if (isCount) {
    if (!anyFilter) {
      const act = EMPLOYEES.filter((e) => e.status === 'active').length;
      return { lang, blocks: [{ kind: 'text', text: t(`Det er **${EMPLOYEES.length} ansatte** totalt — ${act} aktive og ${EMPLOYEES.length - act} oppsagt.`, `There are **${EMPLOYEES.length} employees** in total — ${act} active and ${EMPLOYEES.length - act} terminated.`) }] };
    }
    const blocks: Block[] = [{ kind: 'text', text: t(`Det er **${rows.length}** ansatte (${desc}).`, `There are **${rows.length}** employees (${desc}).`) }];
    if (rows.length && rows.length <= 12) blocks.push({ kind: 'table', rows });
    return { lang, blocks };
  }
  if (p.names.length && rows.length === 1) return { lang, blocks: [{ kind: 'profile', emp: rows[0]! }] };
  if (anyFilter) {
    if (!rows.length) return none;
    return { lang, blocks: [{ kind: 'text', text: t(`Fant **${rows.length}** ansatte${desc ? ` (${desc})` : ''}:`, `Found **${rows.length}** employees${desc ? ` (${desc})` : ''}:`) }, { kind: 'table', rows }] };
  }
  if (has(/\b(ansatte|employees|everyone|alle|staff|people)\b/i)) {
    rows = EMPLOYEES;
    return { lang, blocks: [{ kind: 'text', text: t(`Alle ${rows.length} ansatte:`, `All ${rows.length} employees:`) }, { kind: 'table', rows }] };
  }
  return {
    lang, blocks: [
      { kind: 'text', text: t('Beklager, det spørsmålet forsto jeg ikke helt. Jeg kan svare på:', "Sorry, I didn't quite understand that. I can help with:") },
      { kind: 'list', items: lang === 'no'
        ? ['Antall ansatte, per avdeling eller type', 'Organisasjonsstruktur og avdelinger', 'Søk på navn, stilling eller avdeling', 'Oppsagte, deltid og ansettelsesdato', 'Lengst ansatt, nyeste ansatt, største avdeling', 'E-post og telefonnummer']
        : ['Headcounts by department or type', 'Organization structure and departments', 'Search by name, position or department', 'Terminated, part-time and hire dates', 'Longest tenured, newest hire, largest department', 'Email and phone numbers'] },
      { kind: 'chips', items: lang === 'no' ? SUGGEST_NO : SUGGEST_EN },
    ],
  };
}
