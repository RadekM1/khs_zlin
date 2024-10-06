import { Suspense } from "react";
import SpinnerBigOrange from "@/components/spinners/spinnerBigOrange";

export default function Layout({ children }) {
  return (
    <div className="max-w-screen-xl m-2 p-2 mb-10 rounded items-start my-4 sm:px-3 md:px-8 lg:px-0 justify-start w-full dark:bg-[#161616] bg-white flex flex-col text-center shadow-[0_15px_15px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_rgba(255,152,0,0.2),0_1px_3px_rgba(255,1180,0,0.05)]">
      <div className="mt-4"></div>
      <Suspense fallback= { <SpinnerBigOrange /> } >
      {children}
      </Suspense>
    </div>
  );
}
