import { NextAuthOptions } from "next-auth";
import GooggleProvider from "next-auth/providers/google";
import { PgCustomAdapter } from "../src/adapters/custom-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GooggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],adapter: PgCustomAdapter()
};

