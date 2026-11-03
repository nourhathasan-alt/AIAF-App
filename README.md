# Axaz HR Assistant

Chatbot-app for å spørre om alt som ligger i **Axaz HR** (demo-data for selskapet «Bjorkas»): ansatte, avdelinger, organisasjonsstruktur, kontaktinfo, ansettelsesdatoer og mer. Forstår både **norsk og engelsk**.

Eksportert som en selvstendig app fra monday.com Vibe-appen [Axaz HR Assistant](https://axaz.monday.com/vibe/app/10569370) (eksportert 2026-11-03).

## Data

Hele datasettet ligger innebygd i [`src/data.ts`](src/data.ts) (snapshot per 2026-11-03 fra `hr.axaz.app`):

- **50 ansatte** (48 aktive, 2 oppsagt) — navn, e-post, telefon, avdeling, stilling, type, status, ansettelses-/sluttdato
- **12 avdelinger** med koder (Administration, Construction, Customer Success, Finance, HSE, Human Resources, IT, Marketing, Production, Quality, Sales, Warehouse)

API-et i Axaz HR tillater ikke direkte kalle fra nettleser (mangler CORS), og API-nøkkelen er MCP-begrenset — derfor er dataene innebygd som snapshot. For å oppdatere dataene: hente på nytt fra API-et (se `SNAPSHOT_DATE`) og erstatte arrayene i `src/data.ts`.

## Struktur

| Fil | Hva den gjør |
|---|---|
| `src/App.tsx` | Chat-UI: header med stat-badges, meldingstråd, forslag-chips, input |
| `src/engine.ts` | Spørsmålmotøren — regel-basert NO/EN tolk (antall, avdelinger, navn, stilling, status, deltid, datoer, superlativer, kontaktinfo, fallback) |
| `src/BotBlocks.tsx` | Renderer svar: tekst, lister, tabeller, profil-kort, avdelingsoversikt, chips |
| `src/data.ts` | Innebygd datasett (ansatte + avdelinger) |

Alle tall og lister regnes ut fra dataene ved kjøring — boten oppfinneverver aldri ansatte.

## Kjør lokalt

```bash
npm install
npm run dev
```

Åpne adressen som Vite viser (som regel http://localhost:5173).

## Bygg

```bash
npm run build    # typecheck + prod-build til dist/
npm run preview  # forhåndsvis av prod-build
```

## Deployment

`vite.config.ts` har `base: './'`, så `dist/`-mappen fungerer fra hvilken som helst sti:

- **Vercel / Netlify** — pek på repoet, build command `npm run build`, output `dist`
- **GitHub Pages** — bygg og publiser `dist/` (f.eks. med `actions/deploy-pages`)
- Eventuelt: kjøre `dist/index.html` direkte i nettleseren

## Eksempler på spørsmål

- «Hvor mange ansatte er det?»
- «Hvem er CFO-en?»
- «Alle i Sales»
- «Hvilke avdelinger finnes?»
- «Deltidsansatte»
- «Ansatte etter 2020»
- «How many people work in IT?»
- «Phone number of the CTO»
