import { SignUp } from "@modules/Users";

import { getLayout } from "@components/Layout/Wrapper";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type SignUpPageProps = {};

const SignUpPage: NextPageWithLayout<SignUpPageProps> = () => {
  return <SignUp />;
};

SignUpPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<SignUpPageProps> = async ({
  locale,
  req,
  res,
  query,
}) => {
  return {
    props: {},
  };
};

export default SignUpPage;
