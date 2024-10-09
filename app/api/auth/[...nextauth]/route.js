import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import { compare } from 'bcryptjs';
import { validateEmail } from "@/lib/functions/validateEmail";
import { validatePassword } from "@/lib/functions/validatePassword";

const handler = NextAuth({
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60
  },
  secret: process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_SECRET : undefined,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        account: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const sqlConnection = await pool.connect();

        try {
          if (!validateEmail(credentials.account) || !validatePassword(credentials.password)) {
            throw new Error('Nevhodné heslo nebo jméno');
          }

          const cleanUser = credentials.account;

          const result = await executeQuery({
            sqlConnection,
            query: 'SELECT * FROM users WHERE account = $1',
            values: [cleanUser],
          });
          
          if (result.rows.length === 0) {
            throw new Error('Uživatel v databázi nenalezen');
          }

          const row = result.rows[0];
          const passFromDatabase = row.hash_password;
          const passFromClient = credentials.password;

          const passEqual = await compare(passFromClient, passFromDatabase);

          if (!passEqual) {
            throw new Error('Zadané heslo není správné');
          }

          return { 
            email: cleanUser, 
            avatar: result.rows[0].avatar,
            clearance: result.rows[0].clearance,
            name: result.rows[0].name,
            lastName: result.rows[0].lastname
          };

        } catch (error) {
          return null;
        } finally {
          sqlConnection.release();
        }
      },
    }),
  ],

  callbacks: {
   
    async jwt({ token, user }) {
      if (user) {
     
        token.email = user.email;
        token.avatar = user.avatar;
        token.clearance = user.clearance;
        token.name = user.name;
        token.lastName = user.lastName;
      }
      return token;
    },

  
    async session({ session, token }) {
     
      session.user.email = token.email;
      session.user.avatar = token.avatar;
      session.user.clearance = token.clearance;
      session.user.name = token.name;
      session.user.lastName = token.lastName;
      return session;
    }
  }

});

export const GET = handler;
export const POST = handler;
