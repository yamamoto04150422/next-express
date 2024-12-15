"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 認証中の場合はローディング表示
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // サインインしている場合
  if (session) {
    const handleSignOut = async () => {
      try {
        await signOut({ redirect: false });
        router.push("/"); // サインアウト後にトップページへリダイレクト
      } catch (error) {
        console.error("Sign out failed", error);
      }
    };

    return (
      <div className="auth-container">
        <h1>Welcome, {session.user?.name}!</h1>
        <p>Email: {session.user?.email}</p>
        {session.user?.image && (
          <img
            src={session.user.image || ""}
            alt="Profile"
            className="profile-image"
          />
        )}
        <Button
          label="Sign out"
          icon="pi pi-sign-out"
          className="p-button-danger"
          onClick={handleSignOut}
        />
      </div>
    );
  }

  // サインインしていない場合
  return (
    <div className="login-container">
      <Button
        label="GitHubでログイン"
        icon="pi pi-github"
        className="p-button-rounded p-button-outlined"
        onClick={() => signIn("github")}
      />
      <Button
        label="Googleでログイン"
        icon="pi pi-google"
        className="p-button-rounded p-button-outlined"
        onClick={() => signIn("google")}
      />
      <Button
        label="Appleでログイン"
        icon="pi pi-apple"
        className="p-button-rounded p-button-outlined"
        onClick={() => signIn("apple")}
      />
      <p>他のアカウントでログイン:</p>
      <Button
        label="その他のプロバイダー"
        icon="pi pi-users"
        onClick={() => signIn()}
      />
    </div>
  );
}
