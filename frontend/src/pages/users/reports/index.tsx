import { Reports } from "@modules/Users";

import { getLayout } from "@components/Layout/Wrapper";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type ReportsPageProps = {};

const ReportsPage: NextPageWithLayout<ReportsPageProps> = () => {
  return <Reports />;
};

ReportsPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async ({
  locale,
  req,
  res,
  query,
}) => {
  return {
    props: {},
  };
};

export default ReportsPage;
