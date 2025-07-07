// app/page.tsx
import React from "react";
import { getSession } from "../lib/auth";
import AuthButtons from "../components/Buttons";

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      {session ? <p>Welcome, {session.user?.name}</p> : <p>Please sign in</p>}
      <AuthButtons />
    </div>
  );
}