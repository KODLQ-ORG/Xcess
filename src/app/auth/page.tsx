// src/app/auth/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useApplicationData } from "../providers";
import FullScreenLoading from "@/components/FullScreenLoading";

export default function Auth() {
  const session = useSession();
  const { isLoading } = useApplicationData();

  if (session.data?.user.accessToken) {
    redirect("/home");
  }
  if (isLoading) {
    return <FullScreenLoading></FullScreenLoading>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-[5rem]">
          Welcome to
          <span className="text-indigo-600"> Xcess</span>
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-lg text-gray-600">
            Sign in with your Microsoft account to continue.
          </p>
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => signIn("azure-ad")}
          >
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </main>
  );
}
