"use client";

import Link from "next/link";
import AuthButton from "./components/auth/AuthButton";
import { Button } from "primereact/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryError = searchParams.get("error");
    if (queryError === "unauthorized") {
      setError("ログイン認証が必要です。");
      router.replace("/"); // クエリパラメータを削除
    }
  }, [searchParams, router]);

  return (
    <>
      <h1>Next.js OAuth Example</h1>
      <AuthButton />
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      <p>検証</p>
      <Link href="/register">
        <Button label="新規会員登録" />
      </Link>
      <Link href="/sample">
        <Button label="認証が不要な画面" />
      </Link>
    </>
  );
}
