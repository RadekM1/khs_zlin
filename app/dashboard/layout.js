'use client';

import { SessionProvider } from "next-auth/react";

export default function Layout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <div className="max-w-screen-xl min-h-screen mb-10 rounded items-start  w-full dark:bg-[#161616] bg-white flex flex-col text-center shadow-[0_15px_15px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_rgba(255,152,0,0.2),0_1px_3px_rgba(255,1180,0,0.05)]">
        <div className="mt-4"></div>
        {children}
      </div>
    </SessionProvider>
  );
}