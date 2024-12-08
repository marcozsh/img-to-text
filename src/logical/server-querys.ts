"use server";

import { sql } from "@vercel/postgres";

export const getUserByNameEmail = async (name: string, email: string) => {
  try {
    const { rows } =
      await sql`SELECT id FROM public.users WHERE name = ${name} AND email = ${email} LIMIT 1`;
    console.log(rows[0].id);
    if (rows.length > 0) {
      return rows[0].id;
    }
    return -1;
  } catch (ex) {
    console.log(ex);
  }
};

export const saveLog = async (
  name: string,
  email: string,
  text: string,
  method_used: string,
) => {
  try {
    const userId = await getUserByNameEmail(name, email);
    if (userId > 0) {
      const inserted_log =
        await sql`INSERT INTO public.text_converted_log (iduser, text, method_used) VALUES (${userId}, ${text}, ${method_used})`;
    }
  } catch (ex) {
    console.log(ex);
  }
};
