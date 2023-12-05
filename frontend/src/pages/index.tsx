import { FC } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

import { getLayout } from "@components/Layout/Wrapper";
import { Container } from "@components/Container";

import type { NextPageWithLayout } from "@/src/pages/_app";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
  return (
    <main className={`${inter.className}`}>
      <Container
        className={clsx(
          "flex flex-col items-center justify-center gap-4",
          "mt-12"
        )}
      >
        <h2 className="text-2xl font-semibold underline">Links</h2>
        <div className="text-center">
          <Link
            href="/users/sign-in"
            className="text-blue-500 hover:text-blue-600 cursor-pointer mb-2 block"
          >
            Sign In
          </Link>
          <Link
            href="/users/sign-up"
            className="text-blue-500 hover:text-blue-600 cursor-pointer block"
          >
            Sign Up
          </Link>
        </div>
      </Container>
    </main>
  );
};

Home.getLayout = getLayout;
export default Home;
