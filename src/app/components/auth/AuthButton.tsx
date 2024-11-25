"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="auth-container">
        <h1>Welcome, {session.user?.name}!</h1>
        <p>Email: {session.user?.email}</p>
        {session.user?.image && (
          // eslint-disable-next-line
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
          onClick={() => signOut()}
        />
      </div>
    );
  }

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
