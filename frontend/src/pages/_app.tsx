import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ConfigProvider } from "antd/lib";
import type { ThemeConfig } from "antd/lib";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#0078FF",
  },
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
