import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DefaultSession } from "@/app/_interfaces/Auth.interface";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existsGuests = await getGuest(user.email!);

        if (!existsGuests) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }

        return true as any;
      } catch {
        return false as any;
      }
    },

    async session({ session, user }: any) {
      const guest = await getGuest(user.email);
      session.user.guestId = guest.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
