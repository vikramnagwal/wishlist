import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { Adapter } from "next-auth/adapters";
import { usernameCookies } from "../constants/cookies";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const baseAdapter = PrismaAdapter(prisma);
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: {
    ...baseAdapter,
    createUser: async (data) => {
      const cookieStore = await cookies();
      // check constants for variable
      const username = cookieStore.get(usernameCookies)?.value;
      if (!username) throw new Error("username missing")
      try {
      return  prisma.user.create({data: { ...data, username}})
    } catch (error) {
      throw new Error("Account creation failed", { cause: error })
    }
    }
  } as Adapter,

  providers: [Google],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.id = await user.id;
      }
      return token
    },

    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
})