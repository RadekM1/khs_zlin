import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import { compare } from 'bcryptjs';
import { validateEmail } from "@/lib/functions/validateEmail";
import { validatePassword } from "@/lib/functions/validatePassword";

export const authOptions = {
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60
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
      
          let wrongPassCount = 0;
         
          const result = await executeQuery({
            sqlConnection,
            query: 'SELECT * FROM users WHERE account = $1',
            values: [cleanUser],
          });
      
          if (result.rows.length === 0) {
            throw new Error('Uživatel v databázi nenalezen');
          }

          
      
          const row = result.rows[0];
          const isBlocked = new Date(row.ban_time_stamp);
          
          const passFromDatabase = row.hash_password;
          const passFromClient = credentials.password;
          const locked = row.locked

          if(locked){
            throw new Error ('neautorizovaný účet')
          }
      
          if (!isNaN(isBlocked.getTime()) && isBlocked > new Date()) {
            throw new Error('Účet je stále zablokován');
          }

          const passEqual = await compare(passFromClient, passFromDatabase);
      
          if (!passEqual) {
            const resWrongPass = await executeQuery({
              sqlConnection,
              query: 'UPDATE users SET wrong_pass_check = wrong_pass_check + 1 WHERE account = $1 RETURNING wrong_pass_check',
              values: [cleanUser],
            });

            wrongPassCount = parseInt(resWrongPass.rows[0].wrong_pass_check);
      
            if (wrongPassCount >= 5) {
              const resBlockAccount = await executeQuery({
                sqlConnection,
                query: `
                UPDATE users SET 
                ban_time_stamp = NOW() + INTERVAL '15 minutes'
                WHERE account = $1`,
                values: [cleanUser],
              });
              throw new Error('Účet byl z bezpečnostních důvodů na 15 minut zablokován, velký počet neplatných pokusů o přihlášení');
            }
            throw new Error('Nesprávné heslo');
          } else {
            const resWrongPass = await executeQuery({
              sqlConnection,
              query: 'UPDATE users SET wrong_pass_check = 0 WHERE account = $1 RETURNING wrong_pass_check',
              values: [cleanUser],
            });
          }

          
       
          return { 
            email: cleanUser, 
            avatar: row.avatar,
            clearance: row.clearance,
            firstName: row.name,
            lastName: row.last_name,
          };
      
        } catch (error) {
         
          throw new Error(error.message);
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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
    
      }
      return token;
    },

  
    async session({ session, token }) {
     
      session.user.email = token.email;
      session.user.avatar = token.avatar;
      session.user.clearance = token.clearance;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;

      
      return session;
    }
  }

};


const handler = NextAuth(authOptions);


export const GET = handler;
export const POST = handler;
