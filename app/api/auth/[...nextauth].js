import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserService from "@/lib/services/UserService"; 


export const POST = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          user: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {

          const userService = new UserService({
            user: credentials.user,
            password: credentials.password,
          });
  
          const loginResult = await userService.login();
  
          if (loginResult?.status === 200) {
            // Pokud přihlášení proběhlo úspěšně, vrať uživatele
            return { id: 1, name: "Uživatel", email: credentials.user }; // Vrať data uživatele, která budou uložena v session
          } else {
            // Pokud selže, vrátíme null
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/login", // Nastavení stránky pro přihlášení
    },
    secret: process.env.NEXTAUTH_SECRET, 
    callbacks: {
      async jwt({ token, user }) {
        
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      },
      async session({ session, token }) {
        
        session.user.id = token.id;
        session.user.email = token.email;
        return session;
      },
    },
    session: {
      strategy: "jwt", 
    },
  });