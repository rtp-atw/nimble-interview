import { getCookie } from "cookies-next";

import { getLayout } from "@/components/Layout/Wrapper";

import { COOKIE_KEY } from "@/hooks";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type SignInPageProps = {};

const SignInPage: NextPageWithLayout<SignInPageProps> = () => {
  return <div />;
};

SignInPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async ({
  locale,
  req,
  res,
  query,
}) => {
  // const jwt = getCookie(COOKIE_KEY, { req, res });

  // if (jwt) {
  //   res.writeHead(303, { Location: "/" });
  //   res.end();
  //   return {
  //     props: {},
  //   };
  // }
  return {
    props: {},
  };
};

export default SignInPage;
