"use client";
//import { login } from "@/app/actions/actions";
import { Button, Input } from "@nextui-org/react";
//import { useFormState } from "react-dom";
//import SubmitButton from "../form/custom-submit-button";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/home");
    }
  });
  return (
    <>
      <section className="flex flex-col items-center p-24 gap-6 lg:w-[600px]">
        <h2 className="font-heading text-2xl text-center font-bold sm:text-4xl md:text-[50px] md:leading-[60px]">
          Iniciar Sesión
        </h2>
        <Button
          className="flex flex-row justify-center gap-2 mt-5 rounded-sm cursor-pointer text-center bg-black text-white dark:bg-white dark:text-[#1f1f1f] border-solid p-2 w-52"
          onClick={() => signIn("google", { callbackUrl: "/home" })}
        >
          <Image src="/google.svg" width="20" height="20" alt="google icon" />
          Continuar con Google
        </Button>
      </section>
    </>
  );
}
