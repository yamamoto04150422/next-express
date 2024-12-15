import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
const { NEXTAUTH_URL, CREDENTIALS_ID, CREDENTIALS_PASSWORD } = process.env;

test("register validation", async ({ page }) => {
  // 環境変数が定義されているかチェック
  if (!NEXTAUTH_URL || !CREDENTIALS_ID || !CREDENTIALS_PASSWORD) {
    throw new Error("環境変数が未定義です");
  }

  await page.goto(NEXTAUTH_URL);

  // 「その他のプロバイダー」リンクをクリック
  await page.getByLabel("その他のプロバイダー").click();

  // ログインフォームの入力
  await page.getByLabel("Id").click();
  await page.getByLabel("Id").fill(CREDENTIALS_ID);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(CREDENTIALS_PASSWORD);

  // ログインボタンをクリック
  await page
    .getByRole("button", { name: "Sign in with Sample Project" })
    .click();

  await page.waitForURL(NEXTAUTH_URL);

  // 「新規会員登録」ラベルの表示を待機
  await page.getByRole("button", { name: "新規会員登録" }).click();

  await page.waitForURL(`${NEXTAUTH_URL}/register`);

  // フォームの登録ボタンをクリック
  await page.getByRole("button", { name: "登録" }).click();

  // バリデーションエラーメッセージを確認
  await expect(page.getByText("ユーザー名は必須です")).toBeVisible();
  await expect(page.getByText("名称は必須です")).toBeVisible();
});
