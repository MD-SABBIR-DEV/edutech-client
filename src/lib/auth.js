import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is required to initialize Better Auth.");
}

const authBaseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";
const authIssuer = new URL(authBaseURL).origin;
const mongoClient = new MongoClient(mongoUri);
const passwordPolicy = {
  id: "password-policy",
  hooks: {
    before: [
      {
        matcher: (context) => context.path === "/sign-up/email",
        handler: createAuthMiddleware(async (context) => {
          const password = context.body.password;
          if (
            typeof password !== "string" ||
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password)
          ) {
            throw new APIError("BAD_REQUEST", {
              message:
                "Password must be at least 6 characters and include an uppercase and a lowercase letter.",
            });
          }
        }),
      },
    ],
  },
};

export const auth = betterAuth({
  database: mongodbAdapter(mongoClient.db(), {
    client: mongoClient,
    transaction: false,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: authBaseURL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    passwordPolicy,
    jwt({
      jwt: {
        issuer: authIssuer,
        audience: authIssuer,
      },
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
