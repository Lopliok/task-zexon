# Device Ping

Malá React aplikace s formulářem na odeslání údajů o zařízení
(`uuid` a `battery_percent`) na endpoint `POST /api/ping`.

## Spuštění

```bash
npm install
npm run dev
```

Aplikace běží na adrese, kterou vypíše Vite (standardně `http://localhost:5173`).

## Skripty

| Příkaz          | Popis                                  |
| --------------- | -------------------------------------- |
| `npm run dev`   | spustí vývojový server                 |
| `npm run build` | produkční build + kontrola TypeScriptu |
| `npm test`      | spustí testy                           |

## Backend / mock

Zadání nedefinuje backend pro `POST /api/ping`, proto je během `npm run dev`
endpoint namockovaný přímo ve Vite (`vite.config.ts`, plugin `mockPingApi`).
Standardně vrací `200`. Pokud do pole `uuid` zadáš hodnotu `fail`, mock vrátí
`500` — takto se dá vyzkoušet zobrazení chybové zprávy.

## Struktura

```
src/
  api/ping.ts            – oddělené API volání (fetch)
  validation.ts          – validační logika (čistá funkce, testovatelná)
  components/
    PingForm.tsx         – formulář, useState, loading/error/success stav
    Message.tsx          – komponent pro success/error zprávu
  validation.test.ts     – testy validace
  components/PingForm.test.tsx – testy formuláře
```

## Validace

- `uuid` – povinné
- `battery_percent` – povinné číslo v rozsahu 0–100
