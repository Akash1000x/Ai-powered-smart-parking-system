import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john@gmail.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-auth
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        //  zod validation, OTP validation here
        const existingUser = await prisma.admin.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              placeId: existingUser.placeId,
            };
          }

          console.log("Invalid password");
          return null;
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: { id: string; name: string; email: string; placeId: string } }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.placeId = user.placeId;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ token, session }: { token: any; session: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token?.email;
        session.user.placeId = token.placeId;
      }

      return session;
    },
  },
};
