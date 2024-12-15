"use server";

import { getNeon } from "./db/db";

const sql = await getNeon();

export const getUserByNameEmail = async (name: string, email: string) => {
  try {
    const user =
      await sql`SELECT id FROM public.users WHERE name = ${name} AND email = ${email} LIMIT 1`;
    console.log(user[0].id);
    if (user.length > 0) {
      return user[0].id;
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
      let todayDateString = new Date().toLocaleString();
      const inserted_log =
        await sql`INSERT INTO public.text_converted_log (iduser, text, text_converter_date ,method_used) VALUES (${userId}, ${text},${todayDateString},${method_used})`;
    }
  } catch (ex) {
    console.log(ex);
  }
};
