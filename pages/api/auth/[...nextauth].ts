import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';


const googleId = process.env.GOOGLE_ID!;
const googleSecret = process.env.GOOGLE_SECRET!;
const githubId=process.env.GITHUB_ID!
const githubSecret=process.env.GITHUB_SECRET!
const secretKey= process.env.NEXTAUTH_SECRET!
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
    GitHubProvider({
        clientId: githubId,
        clientSecret: githubSecret
    })
  ],
  secret: secretKey,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
