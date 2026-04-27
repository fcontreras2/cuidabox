# Cuidabox — guía para Claude

## Monorepo

npm workspaces. Tres apps independientes:
- `apps/website` → puerto 3000 (landing/marketing)
- `apps/app` → puerto 3001 (PWA mobile)
- `apps/doc` → puerto 3002 (documentación/dashboard)

Siempre instalar desde la raíz: `npm install`. Nunca dentro de una app individual.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind v4
- `fcontreras2-ui` como librería de UI — usar siempre sus componentes sobre elementos HTML nativos
- `next-intl` para internacionalización (es/en)
- `react-hook-form` + `yup` para formularios
- `next-themes` para dark mode

## Arquitectura de carpetas

```
src/
  app/[locale]/          ← solo enrutamiento, sin lógica ni UI
    <route>/
      page.tsx           ← una línea: export { default } from '@/modules/...'

  modules/
    <name>/
      pages/
        <PageName>/
          index.tsx      ← vista principal (componente de página)
          useMain.ts     ← hook con toda la lógica del componente
          messages.json  ← traducciones locales (es/en en el mismo archivo)
          components/    ← componentes exclusivos de esta página

  shared/
    components/
      <ComponentName>/
        index.tsx        ← componentes visibles en toda la app (Navbar, Sidebar, etc.)
      index.ts           ← barrel export

packages/
  i18n/
    messages.json        ← traducciones comunes entre apps (Submit, Yes, No, etc.)
    build-messages.mjs   ← script que genera los globales
```

## Reglas de componentes

- Todo componente UI con su propio hook (`useMain.ts` o `use<ComponentName>.ts`)
- Usar siempre componentes de `fcontreras2-ui` — nunca `<button>`, `<span>`, `<p>` raw cuando existe equivalente en la librería
- Escala `neutral` de Tailwind — nunca `gray`
- Dark mode obligatorio en todo elemento visual con clases `dark:`

## Formularios

- Siempre `react-hook-form` + `yup`
- Schema de yup en el mismo archivo del hook o en `schemas/` si es reutilizable entre páginas

## Internacionalización (next-intl)

- Cada página tiene su propio `messages.json` con estructura:
  ```json
  {
    "es": { "title": "..." },
    "en": { "title": "..." }
  }
  ```
- El namespace en el global se genera automáticamente desde la ruta del archivo:
  `modules/dashboard/pages/Main/messages.json` → namespace `modules-dashboard-pages-Main`
- Traducciones comunes en `packages/i18n/messages.json` bajo el namespace `common`
- Al guardar cualquier `messages.json`, Run on Save ejecuta `npm run messages` que regenera los globales
- En el componente: `useTranslations('modules-dashboard-pages-Main')`
- Textos comunes: `useTranslations('common')`

## Next.js 16

- Usar `proxy.ts` — el archivo `middleware.ts` está deprecated en esta versión
- El `proxy.ts` debe exportar la función como `export default`, no como `export const proxy`
- Colores con escala `neutral`, nunca `gray`

## Dark mode

- `ThemeProvider` con `attribute="class"` — la clase `dark` va en el `<html>`
- `@custom-variant dark (&:where(.dark, .dark *))` en `globals.css`
- `@source` apuntando al `index.mjs` de `fcontreras2-ui` para que Tailwind genere las clases dark de la librería
- Fondo base en `@layer base` del `globals.css`

## Traducciones — comando

```bash
npm run messages   # regenera todos los messages/{es,en}.json de cada app
```
