import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const h1Text = await page.textContent("h1.text-center.mb-4");

  // 値を検証
  expect(h1Text).toBe("Next.js OAuth Example");
});
