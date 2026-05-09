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

  test("renders main content in initial HTML (RSC)", async ({ request }) => {
    const res = await request.get("/en");
    const html = await res.text();
    expect(html).toContain("Find the Perfect");
    expect(html).toContain("Why Choose Names Hub?");
    expect(html).toContain("Popular Names");
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("link", { name: "Boy Names", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Girl Names", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Generator", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
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

test.describe("About Page", () => {
  test("renders en about page", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page.locator("h1")).toContainText("About Names Hub");
    await expect(page.getByText("Our Mission")).toBeVisible();
    await expect(page.getByText("Privacy")).toBeVisible();
  });

  test("renders zh about page", async ({ page }) => {
    await page.goto("/zh/about");
    await expect(page.locator("h1")).toContainText("关于");
    await expect(page.getByText("我们的使命")).toBeVisible();
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

  test("shows error alert when API fails", async ({ page }) => {
    await page.route("**/api/generate", (route) => route.fulfill({ status: 500 }));
    await page.goto("/en/generator");
    await page.click('button:has-text("Generate Names with AI")');
    const alert = page.getByText("Generation failed. Please try again.");
    await expect(alert).toBeVisible();
  });

  test("renders names on successful API response", async ({ page }) => {
    await page.route("**/api/generate", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          names: [{ name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous" }],
        }),
      }),
    );
    await page.goto("/en/generator");
    await page.click('button:has-text("Generate Names with AI")');
    await expect(page.getByRole("link", { name: /浩然/ })).toBeVisible();
  });
});

test.describe("Not Found", () => {
  test("name/[slug] unknown returns not-found page", async ({ page }) => {
    await page.goto("/en/name/unknownslug");
    await expect(page.locator("h1")).toContainText("Name Not Found");
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });
});
