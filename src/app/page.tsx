"use client";

import Link from "next/link";
import AuthButton from "./components/auth/AuthButton";
import { Button } from "primereact/button";

export default function Home() {
  return (
    <>
      <h1>Next.js OAuth Example</h1>
      <AuthButton />
      <h1></h1>
      <Link href="/register">
        <Button label="新規会員登録" />
      </Link>
    </>
  );
}
