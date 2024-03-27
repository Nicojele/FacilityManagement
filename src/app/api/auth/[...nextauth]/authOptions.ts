import { AuthOptions } from 'next-auth';

import { authConfigJwtCallback, authConfigSessionCallback } from '@5minds/processcube_app_sdk';

export const authOptions: AuthOptions = {
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
          scope:
            'openid profile email engine_read engine_write officeEmployee facilityEmployee developer'
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
          email_verified: profile.email_verified,
          image: profile.picture,
        };
      },
    },
  ],
};
