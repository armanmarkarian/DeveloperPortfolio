import React from "react";
import { getSession } from "@/lib/auth";
import Buttons from "@/components/Buttons";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground px-6">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 1792 1792"
            fill="currentColor"
            className="w-20 h-20 text-black dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387..."/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          {session ? `Welcome, ${session.user?.name}` : "Sign in to your developer portfolio"}
        </h1>

        {session && (
          <Link href="/profile">
            <button className="inline-flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow transition-colors">
              Edit Portfolio
            </button>
          </Link>
        )}

        <Buttons />
      </div>
    </main>
  );
}