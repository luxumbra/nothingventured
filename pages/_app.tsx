import { AppProps } from "next/dist/next-server/lib/router/router";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

import "../styles/globals.css";
import "@fontsource/sora";
import AdminLayout from "../layouts/AdminLayout";

const theme = extendTheme({
  fonts: {
    body: "Sora",
    heading: "Sora",
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SafeHydrate>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </ChakraProvider>
      </SafeHydrate>
    </>
  );
}

export default App;

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}
