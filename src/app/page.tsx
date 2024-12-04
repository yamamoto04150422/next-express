"use client";

import Link from "next/link";
import AuthButton from "./components/auth/AuthButton";
import { Button } from "primereact/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteStats } from "@/types/siteStats/SiteStats";

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

  const [stats, setStats] = useState<SiteStats | null>(null);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats", { cache: "force-cache" });
        if (res.ok) {
          const data: SiteStats = await res.json();
          setStats(data);
        } else {
          throw new Error("データの取得に失敗しました");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchStats();
  }, []);

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
      {stats ? (
        <div>
          <h2>サイト統計情報</h2>
          <ul>
            <li>登録ユーザー数: {stats.totalUsers}</li>
            <li>記事数: {stats.totalArticles}</li>
            <li>日次アクティブユーザー数: {stats.dailyActiveUsers}</li>
          </ul>
        </div>
      ) : (
        <p>統計情報を取得中...</p>
      )}
    </>
  );
}
