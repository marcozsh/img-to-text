"use client";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export function useCurrentSession(): Session | null {
  // Si no está en localStorage, obtener la sesión de NextAuth
  const { data: session } = useSession();

  // Retornar la sesión de NextAuth
  return session;
}
