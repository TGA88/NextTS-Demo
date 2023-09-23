import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { VscAzure, VscAccount } from "react-icons/vsc";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import pkg from "../package.json";
import { useEffect, useState } from "react";
// import localForage from "localforage";

interface SignInProps {
  providers: Provider;
}

interface Provider {
  id: number;
  name: string;
}
const SignIn = ({ providers }: SignInProps) => {
  const { status } = useSession();
  // useEffect(() => {
  //   if(status  === "unauthenticated" )
  // console.log(providers)
  //   Object.values(providers).map((provider) =>(
  //     signIn(provider.id)
  //     ))

  // },[]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          "radial-gradient(circle, #19273d, #17384c, #184958, #235a61, #376b66)",
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "380px",
          border: "1px solid #ddd",
          m: 3,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ py: 3, px: 7, display: "flex", alignItems: "center" }}>
            {/* <Image
              src="/assets/images/Logo.png"
              width="58"
              height="58"
              alt="logo"
            /> */}

            <VscAccount size={40} />

            <Typography
              variant="h4"
              color="#173a4e"
              sx={{ pl: 2, fontWeight: "bold" }}
            >
              Portal Feed
            </Typography>
          </Box>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "background.paper",
            padding: "15px",
            minHeight: 230,
          }}
        >
          <Typography variant="h6" sx={{ py: 2, textAlign: "center" }}>
            Please loading...
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => signIn(provider.id)}
                    startIcon={
                      provider.name === "Azure Active Directory" ? (
                        <VscAzure />
                      ) : (
                        ""
                      )
                    }
                  >
                    {` ${provider.name}`}
                  </Button>
                </div>
              ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "background.paper",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          <Divider />
          <Typography variant="caption" sx={{ pr: 3, color: "text.secondary" }}>
            Copyright © CPF IT Center (Version {pkg.version})
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

SignIn.nonLayout = true;
export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("context", context);
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  // console.log('session' , session)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { providers } };
};
