"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }

  return <button onClick={() => signIn("github", { callbackUrl: "/profile"})}>Sign in with GitHub</button>;
}