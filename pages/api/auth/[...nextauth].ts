import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import LineProvider from "next-auth/providers/line";

async function refreshAccessToken(token: any) {
  try {
    // console.log(`Call refreshAccessToken : ${new Date()}`);
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.AZURE_AD_CLIENT_ID as string,
        client_secret: process.env.AZURE_AD_CLIENT_SECRET as string,
        scope: process.env.SCOPE_API as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }
    const newToken = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
    return newToken;
  } catch (error) {
    return {
      ...token,
      error:
        token.user.provider === "azure-ad" ? "RefreshAccessTokenError" : null,
    };
  }
}

const updateEmailUserID = async (
  accessToken: string,
  email: string,
  name: string,
  userId: string
) => {
  const url = `${process.env.BASE_API_URL}/api/${process.env.BASE_API_VERSION}/user/register`;
  const param = {
    username: userId,
    name: name,
    userGroup: "AZURE",
    email: email,
  };
  const register = await axios.post(url, param, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return register.data;
};

const getProfile = async (accessToken: string) => {
  const url = "https://graph.microsoft.com/beta/me";
  const profile = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const onPremisesSamAccountName = profile.data.onPremisesSamAccountName;
  return onPremisesSamAccountName;
};

const getRoleUser = async (accessToken: string) => {
  const url = `${process.env.BASE_API_URL}/api/user/getrole`;

  const getRole = fetch(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return getRole;
};

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: { scope: process.env.AZURE_AD_SCOPE },
      },
    }),
    // LineProvider({
    //   clientId: process.env.LINE_CLIENT_ID as string,
    //   clientSecret: process.env.LINE_CLIENT_SECRET as string,
    //   authorization: { params: { scope: "openid profile email" } },
    //   // profile(profile) {
    //   //   return {
    //   //     id: profile.sub,
    //   //     email: profile.email,
    //   //     ...profile,
    //   //   };
    //   // },
    // }),
  ],

  callbacks: {
    // async redirect({ url, baseUrl }: any) {
    //   console.log("url", url);
    //   console.log("baseUrl", baseUrl);
    //   return url;
    //   // return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async jwt({ token, user, account }: any) {
      // Persist the OAuth access_token to the token right after signin

      if (account && user) {
        let accessTokenExpires =
          Date.now() + parseInt(account.ext_expires_in) * 1000;
        // token line
        user.idToken = account.id_token;
        user.provider = account.provider;
        return {
          // idToken:account.id_token,
          // token ที่ได้
          accessToken: account.access_token,
          // accessTokenExpires: Date.now() + 120 * 1000,
          accessTokenExpires: accessTokenExpires,
          refreshToken: account.refresh_token,
          user,
        };
      }

      //fix
      // token.userRole = ['ADMIN'];
      // token.user = 'NICK TEST';
      // token.userid = '12345';
      // return { ...token };
      // console.log("accessTokenExpires", token.accessTokenExpires);
      // console.log("accessTokenExpires", Date.now() < token.accessTokenExpires);
      // console.log("refreshToken", token.refreshToken);
      //Return previous token if the access token has not expired yet
      // console.log('token', token)
      if (Date.now() < token.accessTokenExpires) {
        if (token.userid === undefined) {
          token.userid = token.user.email;
          let newToken = await refreshAccessToken(token);
          // await updateEmailUserID(
          //   newToken.accessToken,
          //   token.user.email,
          //   token.user.name,
          //   token.userid.toString()
          // );
          //   const getRole = await getRoleUser(newToken.accessToken);
          newToken.userRole = ["ADMIN"];
          //   newToken.userRole = getRole;
          return { ...newToken };
        }
        return token;
      } else {
        let newToken = await refreshAccessToken(token);
        return { ...newToken };
      }
    },
    async session({ session, token }: any) {
      // console.log("fist_access: " + token.accessToken);
      session.user = token.user;
      session.userid = token.userid;
      session.userRole = token.userRole;
      // session.userJob = token.userJob;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 8 * 60 * 60,
  },
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 8 * 60 * 60, //  8 hours
    updateAge: 8 * 60 * 60, // 8 hours
  },
  pages: {
    signIn: "/signin",
    // signIn: "http://localhost:3000",
  },
  debug: true,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
