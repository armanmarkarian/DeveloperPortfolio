import React from "react";
import { getSession } from "@/lib/auth";
import Buttons from "@/components/Buttons";

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
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.086 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.42-1.305.763-1.605-2.665-.304-5.467-1.334-5.467-5.932 0-1.311.47-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.048.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.922.43.372.815 1.102.815 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12 24 5.373 18.627 0 12 0Z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          {session ? `Welcome, ${session.user?.name}` : "Sign in to your developer portfolio"}
        </h1>

        <Buttons />
      </div>
    </main>
  );
}