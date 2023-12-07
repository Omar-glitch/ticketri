import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import clientPromise from "./lib/mongodb";
import { UserEntity } from "./app/api/users/route";
import { decrypt } from "./lib/cypher";

export const authOptions = {
  theme: {
    logo: "/plogo.png",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "correo@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || typeof password !== "string") return null;

        try {
          const client = await clientPromise;
          const db = client.db("ticketri");
          const user = await db
            .collection<UserEntity>("users")
            .findOne({ email });
          if (!user) return null;

          const savedPassword = decrypt(user.password);
          const passwordMatch = password === savedPassword;

          if (!passwordMatch) return null;
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) session.user.role = String(token.role);
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export async function auth() {
  const session = await getServerSession(authOptions);
  return session;
}

export function isAuthenticated(session: Session | null) {
  return Boolean(session);
}

export function isAdmin(session: Session | null) {
  if (!session) return false;
  if (session.user.role !== "admin") return false;
  return true;
}
