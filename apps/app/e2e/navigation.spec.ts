import { test, expect } from "@playwright/test";

// Selector screen (ruta raíz)
test.describe("Selector de paciente", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("muestra el logo y el saludo", async ({ page }) => {
    await expect(page.getByText("CuidaBox")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("lista al menos un paciente", async ({ page }) => {
    const cards = page.locator("button.group");
    await expect(cards.first()).toBeVisible();
  });

  test("navega al dashboard al seleccionar un paciente", async ({ page }) => {
    await page.locator("button.group").first().click();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

// Dashboard
test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("button.group").first().click();
    await page.waitForURL(/\/dashboard/);
  });

  test("muestra la TabBar con 5 ítems", async ({ page }) => {
    const tabBar = page.locator("nav").last();
    await expect(tabBar).toBeVisible();
    const links = tabBar.locator("a");
    await expect(links).toHaveCount(5);
  });

  test("muestra la sección 'Right now'", async ({ page }) => {
    await expect(page.getByText("Right now")).toBeVisible();
  });

  test("muestra la sección 'What's coming'", async ({ page }) => {
    await expect(page.getByText("What's coming")).toBeVisible();
  });

  test("muestra la card de medicación actual", async ({ page }) => {
    await expect(page.getByText("Paracetamol")).toBeVisible();
  });
});

// Navegación por TabBar
test.describe("Navegación TabBar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("button.group").first().click();
    await page.waitForURL(/\/dashboard/);
  });

  test("navega a Historia", async ({ page }) => {
    await page.locator("nav a[href='/history']").click({ force: true });
    await expect(page).toHaveURL(/\/history/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("navega a Registrar", async ({ page }) => {
    await page.locator("nav a[href='/register']").click({ force: true });
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("navega a Médicos", async ({ page }) => {
    await page.locator("nav a[href='/doctors']").click({ force: true });
    await expect(page).toHaveURL(/\/doctors/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("vuelve al dashboard desde Historia", async ({ page }) => {
    await page.locator("nav a[href='/history']").click({ force: true });
    await page.waitForURL(/\/history/);
    await page.locator("nav a[href='/dashboard']").click({ force: true });
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText("Right now")).toBeVisible();
  });
});

// Historia / Timeline
test.describe("Historia", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/history");
  });

  test("muestra eventos agrupados por día", async ({ page }) => {
    // "Hoy" está hardcodeado en useMain.ts (no es i18n)
    await expect(page.getByText("Hoy")).toBeVisible();
  });

  test("muestra al menos un evento en la timeline", async ({ page }) => {
    const events = page.locator("article");
    await expect(events.first()).toBeVisible();
  });
});

// Registro rápido
test.describe("Registro rápido", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("muestra el botón de micrófono", async ({ page }) => {
    await expect(page.getByRole("button", { name: /grabar/i })).toBeVisible();
  });

  test("muestra ejemplos de entrada", async ({ page }) => {
    await expect(page.getByText("EXAMPLES")).toBeVisible();
    const section = page.locator("section").last();
    await expect(section.locator("button").first()).toBeVisible();
  });

  test("al pulsar un ejemplo rellena el textarea", async ({ page }) => {
    const chip = page.locator("section").last().locator("button").first();
    const chipText = await chip.locator("span").last().innerText();
    await chip.click();
    const textarea = page.locator("textarea");
    await expect(textarea).toHaveValue(chipText);
  });

  test("procesar texto muestra el resumen IA", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("Le di paracetamol 5ml y tenía fiebre de 38 grados");
    await page.getByRole("button", { name: /process/i }).click();
    await expect(page.getByText("Esto entendí")).toBeVisible();
  });
});

// Médicos
test.describe("Médicos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/doctors");
  });

  test("muestra el médico principal destacado", async ({ page }) => {
    // Badge hardcodeado en español en el componente
    await expect(page.getByText("Médico de cabecera")).toBeVisible();
  });

  test("muestra la sección de especialistas", async ({ page }) => {
    await page.mouse.wheel(0, 600);
    await expect(page.locator("h3", { hasText: "Specialists" })).toBeVisible();
  });
});

// Medicamentos
test.describe("Medicamentos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/medications");
  });

  test("muestra las pestañas Active y Past", async ({ page }) => {
    await expect(page.getByRole("tab", { name: /active/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /past/i })).toBeVisible();
  });

  test("lista medicamentos activos", async ({ page }) => {
    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible();
  });

  test("cambia a la pestaña Past", async ({ page }) => {
    await page.getByRole("tab", { name: /past/i }).click();
    await expect(page.getByText("Past treatments")).toBeVisible();
  });
});
