import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../services";

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@doe.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const userByEmail = await getUserByEmail(credentials?.email);

        if (!userByEmail?.password) {
          return null;
        }

        const isValid = await compare(
          credentials.password,
          userByEmail.password
        );

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return { email: userByEmail.email, id: userByEmail.id };
      },
    }),
  ],
});
