import { SignIn } from "@modules/Users";

import { getLayout } from "@components/Layout/Wrapper";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type SignInPageProps = {};

const SignInPage: NextPageWithLayout<SignInPageProps> = () => {
  return <SignIn />;
};

SignInPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<
  SignInPageProps
> = async ({}) => {
  return {
    props: {},
  };
};

export default SignInPage;
