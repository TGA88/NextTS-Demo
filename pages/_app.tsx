import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Header from "../layout/Header/Header";
import Layout from "../layout/Layout";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>

      <Provider store={store}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
