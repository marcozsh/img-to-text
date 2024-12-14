"use server";
import { neon } from "@neondatabase/serverless";

export const getNeon = async () => neon(process.env.DATABASE_URL || "");
