import { test, expect } from "@playwright/test";

test("toppage title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const h1Text = await page.textContent("h1.text-center.mb-4");

  // 値を検証
  expect(h1Text).toBe("Next.js OAuth Example");
});

test("should check if the element exists", async ({ page }) => {
  // ページを開く
  await page.goto("http://localhost:3000");

  // リンクをクリック
  await page.getByRole("link", { name: "認証が不要な画面" }).click();

  // 要素の存在を確認
  const targetElement = await page.locator("div.sc-gtLWhw.eARkff > p");
  await expect(targetElement).toHaveText("組織１組織１組織１組織１");
});
