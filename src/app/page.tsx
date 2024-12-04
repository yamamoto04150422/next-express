"use client";

import Link from "next/link";
import AuthButton from "./components/auth/AuthButton";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
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
    <div className="p-3">
      <h1 className="text-center mb-4">Next.js OAuth Example</h1>
      <div className="text-center mb-4">
        <AuthButton />
      </div>

      {error && (
        <h3 style={{ color: "red" }} className="text-center">
          {error}
        </h3>
      )}

      <div className="text-center mb-4">
        <p>検証</p>
        <Link href="/register">
          <Button label="新規会員登録" className="p-button-primary p-mr-2" />
        </Link>
        <Link href="/sample">
          <Button label="認証が不要な画面" className="p-button-secondary" />
        </Link>
      </div>

      {stats ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{ width: "100%", maxWidth: "400px" }}
            className="text-center"
          >
            <h2>サイト統計情報</h2>
            <h4>登録ユーザー数</h4>
            <p>{stats.totalUsers}</p>
            <h4>記事数</h4>
            <p>{stats.totalArticles}</p>

            <h4>日次アクティブユーザー数</h4>
            <p>{stats.dailyActiveUsers}</p>
          </Card>
        </div>
      ) : (
        <div className="text-center p-mt-5">
          <p>統計情報を取得中...</p>
        </div>
      )}
    </div>
  );
}
