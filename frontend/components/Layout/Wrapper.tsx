import type { ReactElement } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const getLayout = (children: ReactElement) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
