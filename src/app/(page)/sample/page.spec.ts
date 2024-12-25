import { test, expect } from "@playwright/test";

test("toppage title", async ({ page }) => {
  await page.goto("/");

  const h1Text = await page.textContent("h1.text-center.mb-4");

  // 値を検証
  expect(h1Text).toBe("Next.js OAuth Example");
});

test("should check if the element exists", async ({ page }) => {
  // ページを開く
  await page.goto("/");

  // リンクをクリック
  await page.getByRole("link", { name: "認証が不要な画面" }).click();

  // 要素が表示されるまで待機
  await page.waitForSelector("p:has-text('組織１組織１組織１組織１')", {
    state: "visible",
  });

  // 要素を取得
  const targetElement = page.locator("p:has-text('組織１組織１組織１組織１')");

  // 要素の表示を検証
  await expect(targetElement).toBeVisible();
});
