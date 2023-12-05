import { Report } from "@modules/Users";

import { getLayout } from "@components/Layout/Wrapper";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type ReportPageProps = {};

const ReportPage: NextPageWithLayout<ReportPageProps> = () => {
  return <Report />;
};

ReportPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<ReportPageProps> = async ({
  locale,
  req,
  res,
  query,
}) => {
  return {
    props: {},
  };
};

export default ReportPage;
