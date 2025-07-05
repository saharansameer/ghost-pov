/* eslint-disable @typescript-eslint/no-unused-vars */

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoClient from "@/lib/db/mongo-client";
import { sendEmail } from "@/lib/email/email";
import { createUserProfile } from "@/lib/auth/profile";

export const auth = betterAuth({
  database: mongodbAdapter(mongoClient.db("ghostpovdb")),
  plugins: [],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    freshAge: 0, // disabled
    cookieCache: {
      enabled: true,
      maxAge: 60 * 15, // 15 minutes
    },
  },
  rateLimit: {
    enabled: true,
    window: 10, // time window in seconds
    max: 5, // max requests in the window
    customRules: {
      "/sign-in/email": {
        window: 600,
        max: 2,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        type: "reset",
        email: user.email,
        name: user.name,
        url,
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      prompt: "select_account",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        type: "verify",
        email: user.email,
        name: user.name,
        url,
      });
    },
    autoSignInAfterVerification: true,
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url, token },
        request
      ) => {
        await sendEmail({
          type: "change",
          email: user.email,
          name: user.name,
          url,
          newEmail,
        });
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createUserProfile(user.id);
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
