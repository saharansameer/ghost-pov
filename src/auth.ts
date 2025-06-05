import NextAuth from "next-auth";
import type { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import connectDB from "@/lib/db";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@doe.in" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },

      async authorize(credentials): Promise<User | null> {
        await connectDB();
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Email and password are required");
          }

          const user = await UserModel.findOne({
            email: credentials.email as string,
          });
          if (!user) {
            throw new Error("User not found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }

          return user as User;
        } catch (error) {
          console.error("Auth Credentials Error:", error);
          throw new Error("Auth Credentials Error");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id as string,
          isVerified: token.isVerified as boolean,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id as string;
        token.isVerified = user.isVerified as boolean;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
