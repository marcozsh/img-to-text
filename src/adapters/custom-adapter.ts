//import { sql } from "@vercel/postgres";
import { Adapter, AdapterUser } from "next-auth/adapters";

import { getNeon } from "@/logical/db/db";

const sql = await getNeon();

interface AdapterAccount {
  userId: string;
  provider: string;
  providerAccountId: string;
  type: string;
  accessToken?: string;
  expiresAt?: string;
  refreshToken?: string;
  scope?: string;
  tokenType?: string;
  idToken?: string;
  sessionState?: string;
}

interface AdapterSession {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export const PgCustomAdapter = (): Adapter => {
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      try {
        const result = await sql`
          INSERT INTO public.users (name, email, image) 
          VALUES (${user.name}, ${user.email}, ${user.image}) 
          RETURNING id, name, email, image`;
        return (result[0] as AdapterUser) || undefined;
      } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
      }
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          SELECT id, name, email, image FROM public.users WHERE id = ${id}`;
        return (result[0] as AdapterUser) || null;
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        return null;
      }
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          SELECT id, name, email, image FROM public.users WHERE email = ${email}`;
        return (result[0] as AdapterUser) || null;
      } catch (error) {
        console.error("Error obteniendo usuario por email:", error);
        return null;
      }
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          SELECT users.id, users.name, users.email, users.image
          FROM public.users
          JOIN public.accounts ON users.id = accounts."userId"
          WHERE accounts."providerAccountId" = ${providerAccountId} AND accounts.provider = ${provider}`;
        return (result[0] as AdapterUser) || null;
      } catch (error) {
        console.error("Error obteniendo usuario por cuenta:", error);
        return null;
      }
    },

    async updateUser(
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">,
    ): Promise<AdapterUser> {
      try {
        const result = await sql`
          UPDATE public.users 
          SET name = ${user.name}, email = ${user.email}, image = ${user.image} 
          WHERE id = ${user.id} 
          RETURNING id, name, email, image`;
        return result[0] as AdapterUser;
      } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw error;
      }
    },

    async deleteUser(userId: string): Promise<void> {
      try {
        await sql`
          DELETE FROM public.users WHERE id = ${userId}`;
      } catch (error) {
        console.error("Error eliminando usuario:", error);
      }
    },

    async linkAccount(account: AdapterAccount): Promise<void> {
      console.log(account);
      try {
        await sql`
          INSERT INTO public.accounts ("userId", provider, "providerAccountId", type, access_token, expires_at, refresh_token, scope, token_type, id_token, session_state)
          VALUES (${account.userId}, ${account.provider}, ${account.providerAccountId}, ${account.type}, ${account.accessToken}, ${account.expiresAt}, ${account.refreshToken}, ${account.scope}, ${account.tokenType}, ${account.idToken}, ${account.sessionState})`;
      } catch (error) {
        console.error("Error vinculando cuenta:", error);
      }
    },

    async unlinkAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }): Promise<void> {
      try {
        await sql`
          DELETE FROM public.accounts WHERE "providerAccountId" = ${providerAccountId} AND provider = ${provider}`;
      } catch (error) {
        console.error("Error desvinculando cuenta:", error);
      }
    },

    async createSession({
      sessionToken,
      userId,
      expires,
    }: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> {
      try {
        const result = await sql`
          INSERT INTO public.sessions ("sessionToken", "userId", expires) 
          VALUES (${sessionToken}, ${userId}, ${expires.toISOString()}) 
          RETURNING id, "sessionToken", "userId", expires`;
        return result[0] as AdapterSession;
      } catch (error) {
        console.error("Error creando sesión:", error);
        throw error;
      }
    },

    async getSessionAndUser(
      sessionToken: string,
    ): Promise<{ session: AdapterSession; user: AdapterUser }> {
      try {
        const result = await sql`
          SELECT sessions.id AS session_id, sessions."sessionToken", sessions."userId", sessions.expires,
                 users.id AS userId, users.name, users.email, users.image, users."emailVerified"
          FROM public.sessions AS sessions
          JOIN public.users AS users ON sessions."userId" = users.id
          WHERE sessions."sessionToken" = ${sessionToken}`;
        const row = result[0];

        // Devuelve valores predeterminados si no se encuentra la sesión
        return {
          session: row
            ? {
                id: row.session_id,
                sessionToken: row.sessionToken,
                userId: row.userId,
                expires: new Date(row.expires), // Convierte esto a Date
              }
            : {
                id: "",
                sessionToken: "",
                userId: "",
                expires: new Date(), // Usa una fecha por defecto o ajusta según sea necesario
              },
          user: row
            ? {
                id: row.userId,
                name: row.name,
                email: row.email,
                image: row.image,
                emailVerified: row.emailVerified
                  ? new Date(row.emailVerified)
                  : null, // Asegúrate de usar Date o null
              }
            : {
                id: "",
                name: "",
                email: "",
                image: "",
                emailVerified: null, // Usa null o una fecha por defecto
              },
        };
      } catch (error) {
        console.error("Error obteniendo sesión y usuario:", error);
        throw error;
      }
    },

    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">,
    ): Promise<AdapterSession | null> {
      const { sessionToken, expires } = session;

      try {
        const result = await sql`
      UPDATE public.sessions 
      SET expires = ${expires ? expires.toISOString() : null} 
      WHERE "sessionToken" = ${sessionToken} 
      RETURNING id, "sessionToken", "userId", expires`;
        return (result[0] as AdapterSession) || null;
      } catch (error) {
        console.error("Error actualizando sesión:", error);
        return null;
      }
    },
    async deleteSession(sessionToken: string): Promise<void> {
      try {
        await sql`
          DELETE FROM public.sessions WHERE "sessionToken" = ${sessionToken}`;
      } catch (error) {
        console.error("Error eliminando sesión:", error);
      }
    },

    async createVerificationToken({
      identifier,
      expires,
      token,
    }: VerificationToken): Promise<VerificationToken | null> {
      try {
        const result = await sql`
          INSERT INTO public.verification_tokens (identifier, token, expires) 
          VALUES (${identifier}, ${token}, ${expires.toISOString()}) 
          RETURNING identifier, token, expires`;
        return (result[0] as VerificationToken) || null;
      } catch (error) {
        console.error("Error creando token de verificación:", error);
        return null;
      }
    },

    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      try {
        const result = await sql`
          DELETE FROM public.verification_tokens 
          WHERE identifier = ${identifier} AND token = ${token} 
          RETURNING identifier, token, expires`;
        return (result[0] as VerificationToken) || null;
      } catch (error) {
        console.error("Error usando token de verificación:", error);
        return null;
      }
    },
  };
};
