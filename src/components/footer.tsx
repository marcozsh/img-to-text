"use client";

import { nextjs, nextjsdark, tailwind, ts } from "@/data/links";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Marca el componente como montado
  }, []);
  return (
    <>
      <footer className="text-center flex flex-col pt-10">
        <p>Este sitio fue construido con ❤️</p>
        <div className="text-center p-[40px] lg:p-[10px] flex flex-wrap justify-center gap-3 h-1 550px:h-16">
          {mounted ? (
            <img
              className="rounded"
              src={theme === "dark" ? nextjs : nextjsdark}
              alt="nextjs img"
            />
          ) : (
            <img className="rounded" src={nextjs} alt="nextjs img" />
          )}
          <img className="rounded" src={ts} alt="ts img" />
          <img className="rounded" src={tailwind} alt="tailwind img" />
          <br />
        </div>
        <div
          id="contact"
          className="flex flex-row pt-10 lg:pt-5 justify-center"
        >
          <Image src="/mail.png" alt="mail image" width={30} height={30} />
          <Link
            className="pt-[4px] underline  hover:text-primary hover:transition-colors hover:duration-300 hover:ease-in-out"
            href="mailto:marc.penar@outlook.cl"
            target="_blank"
          >
            marc.penar@outlook.cl
          </Link>
        </div>
        <Link
          className="underline pt-[20px] hover:text-primary hover:transition-colors hover:duration-300 hover:ease-in-out"
          href="https://marcozsh.dev"
          target="_blank"
        >
          Marco Peña 2024
        </Link>
      </footer>
    </>
  );
}
