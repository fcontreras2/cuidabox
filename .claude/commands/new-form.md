# new-form

Crea un formulario nuevo siguiendo el patrón estándar de Cuidabox.

## Uso

```
/new-form <módulo> <página> [descripción opcional]
```

Ejemplo: `/new-form onboarding ProfileSetup Formulario de perfil inicial`

---

## Patrón a generar

Crea dos archivos dentro de `apps/app/src/modules/<módulo>/pages/<página>/`:

El nombre del hook coincide con el nombre de la página: `use<Página>.ts`.
Ejemplo: página `Profile` → hook `useProfile.ts`, exportado como `useProfile`.

### `index.tsx` — UI

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Button, FieldInput, FieldsProvider } from "fcontreras2-ui";
import { FormProvider } from "react-hook-form";
import { PhoneFrame } from "@/shared/components";
import { use<Página> } from "./use<Página>";

export default function <Página>() {
  const t = useTranslations("modules-<módulo>-pages-<Página>");
  const { methods, onSubmit } = use<Página>();
  const { formState: { isSubmitting } } = methods;

  return (
    <PhoneFrame>
      <main className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="mb-10">
          <p className="font-display-italic text-[18px] text-coral-600">CuidaBox</p>
          <h1 className="mt-1 font-display text-[36px] leading-tight text-primary-700 dark:text-primary-300">
            {t("title")}
          </h1>
          <p className="mt-2 text-[14.5px] text-ink-600 dark:text-ink-400">
            {t("subtitle")}
          </p>
        </div>

        <FormProvider {...methods}>
          <FieldsProvider t={t}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {/* Campos del formulario */}
              <FieldInput name="fieldName" />

              <Button
                type="submit"
                size="lg"
                fullWidth
                loading={isSubmitting}
                className="bg-primary-700! text-cream! rounded-2xl! hover:bg-primary-900! mt-2"
              >
                {t("submit")}
              </Button>
            </form>
          </FieldsProvider>
        </FormProvider>
      </main>
    </PhoneFrame>
  );
}
```

### `use<Página>.ts` — Lógica

```ts
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

const schema = yup.object({
  fieldName: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;

export function use<Página>() {
  const router = useRouter();
  const locale = useLocale();

  const methods = useForm<FormValues>({ resolver: yupResolver(schema) });

  const { mutate, error } = useMutation({
    mutationFn: (values: FormValues) => Promise.resolve(values), // reemplazar con cliente real
    onSuccess: () => router.push(`/${locale}/`),
  });

  const onSubmit = methods.handleSubmit((values) => mutate(values));

  return { methods, onSubmit, error };
}
```

### `messages.json` — Traducciones

```json
{
  "es": {
    "title": "...",
    "subtitle": "...",
    "form": {
      "fields": {
        "fieldName": "Etiqueta del campo"
      },
      "placeholders": {
        "fieldName": "Placeholder..."
      }
    },
    "submit": "Enviar"
  },
  "en": {
    "title": "...",
    "subtitle": "...",
    "form": {
      "fields": {
        "fieldName": "Field label"
      },
      "placeholders": {
        "fieldName": "Placeholder..."
      }
    },
    "submit": "Submit"
  }
}
```

---

## Reglas obligatorias

### FormProvider + FieldsProvider + t
Siempre envolver el formulario con `FormProvider` (de react-hook-form) y `FieldsProvider` con la prop `t`. Esto permite que los `Field*` components resuelvan label y placeholder automáticamente desde `messages.json` sin pasarlos como props:

```tsx
<FormProvider {...methods}>
  <FieldsProvider t={t}>
    <form>...</form>
  </FieldsProvider>
</FormProvider>
```

### Nombre del hook: `use<Página>`
El hook se llama igual que la página. Ejemplos:
- `Profile` → `useProfile.ts`, exporta `useProfile`
- `SignIn` → `useSignIn.ts`, exporta `useSignIn`
- `EditAddress` → `useEditAddress.ts`, exporta `useEditAddress`

Nunca usar `useMain` como nombre del hook.

### Hook: siempre `const methods`
La variable de `useForm` siempre se llama `methods`, nunca `form` ni otro nombre.

### Schema yup en el mismo archivo del hook
Solo moverlo a `schemas/` si el schema se reutiliza entre varias páginas.

### Field components disponibles en `fcontreras2-ui`
Usar siempre estos en lugar de `<input>`, `<select>`, `<textarea>` nativos:

| Componente | Uso |
|---|---|
| `FieldInput` | Texto, email, password, número |
| `FieldTextarea` | Texto largo |
| `FieldSelect` | Selector de opciones |
| `FieldCheckbox` | Casilla de verificación |
| `FieldSwitch` | Toggle on/off |
| `FieldRadioGroup` | Selección de una opción entre varias |

### Traducciones automáticas por `name`
`FieldsProvider t={t}` + `name` resuelven:
- Label → `form.fields.<name>`
- Placeholder → `form.placeholders.<name>`

Solo pasar `label` o `placeholder` como prop cuando se quiera sobrescribir el valor del messages.

### messages.json — estructura obligatoria
```json
{
  "es": { "form": { "fields": { "<name>": "..." }, "placeholders": { "<name>": "..." } } },
  "en": { "form": { "fields": { "<name>": "..." }, "placeholders": { "<name>": "..." } } }
}
```

### Namespace next-intl
El namespace se deriva automáticamente de la ruta:
`modules/<módulo>/pages/<Página>/messages.json` → `modules-<módulo>-pages-<Página>`

### Después de crear o editar messages.json
Ejecutar `npm run messages` desde la raíz para regenerar los globales.

### Colores
Escala `neutral` de Tailwind, nunca `gray`. Dark mode obligatorio con clases `dark:`.
