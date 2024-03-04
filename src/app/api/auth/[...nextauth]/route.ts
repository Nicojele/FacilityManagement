import { authConfigJwtCallback, authConfigSessionCallback } from '@5minds/processcube_app_sdk';

import NextAuth, { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: authConfigJwtCallback,
    session: authConfigSessionCallback,
  },
  providers: [
    {
      id: 'authority',
      name: '5Minds Authority',
      type: 'oauth',
      wellKnown: `${process.env.PROCESSCUBE_AUTHORITY_URL}/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: 'openid email profile engine_read engine_write',
        },
      },
      idToken: true,
      clientId: process.env.NEXTAUTH_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_SECRET,
      checks: 'pkce',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
