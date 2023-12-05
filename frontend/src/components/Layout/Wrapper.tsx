import type { ReactElement } from "react";

import { Container } from "@components/Container";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const getLayout = (children: ReactElement) => {
  return (
    <>
      <Header />
      <Container className="min-h-[calc(100vh-58px-300px)]">
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};
