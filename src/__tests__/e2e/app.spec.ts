import { test, expect } from "@playwright/test";

test.describe("Locale routing", () => {
  test("should redirect / to default locale (/en)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en/);
  });
});

test.describe("Home Page (en)", () => {
  test("should display hero section", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toContainText("Find the Perfect");
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("link", { name: "Boy Names", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Girl Names", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Generator", exact: true })).toBeVisible();
  });

  test("should navigate to boy page", async ({ page }) => {
    await page.goto("/en");
    await page.click('a[href="/en/boy"]');
    await expect(page).toHaveURL(/\/en\/boy/);
  });

  test("should navigate to girl page", async ({ page }) => {
    await page.goto("/en");
    await page.click('a[href="/en/girl"]');
    await expect(page).toHaveURL(/\/en\/girl/);
  });
});

test.describe("Home Page (zh)", () => {
  test("should display Chinese hero", async ({ page }) => {
    await page.goto("/zh");
    await expect(page.locator("h1")).toContainText("名字");
  });

  test("should show Chinese nav links", async ({ page }) => {
    await page.goto("/zh");
    await expect(page.getByRole("link", { name: "男宝名字", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "女宝名字", exact: true })).toBeVisible();
  });
});

test.describe("Locale switcher", () => {
  test("should switch from en to zh", async ({ page }) => {
    await page.goto("/en");
    await page.getByLabel("Language").selectOption("zh");
    await expect(page).toHaveURL(/\/zh/);
    await expect(page.locator("h1")).toContainText("名字");
  });
});

test.describe("Generator Page", () => {
  test("should display generator form", async ({ page }) => {
    await page.goto("/en/generator");
    await expect(page.locator("h1")).toContainText("AI Name Generator");
  });

  test("should have gender selection buttons", async ({ page }) => {
    await page.goto("/en/generator");
    await expect(page.getByRole("button", { name: "Boy" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Girl" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Any" })).toBeVisible();
  });

  test("should have style options", async ({ page }) => {
    await page.goto("/en/generator");
    await expect(page.getByRole("button", { name: /Classic/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Modern/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Nature/ })).toBeVisible();
  });

  test("should generate names on button click", async ({ page }) => {
    await page.goto("/en/generator");
    await page.click('button:has-text("Generate Names with AI")');
    await page.waitForTimeout(1000);
    const names = page.locator(".space-y-4 > a");
    await expect(names.first()).toBeVisible();
  });
});
