"use server";
import { neon } from "@neondatabase/serverless";

const { DATABASE_URL = "" } = process.env;

export const getNeon = async () => neon(DATABASE_URL);
