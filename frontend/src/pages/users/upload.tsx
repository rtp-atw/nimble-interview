import { Upload } from "@modules/Users";

import { getLayout } from "@components/Layout/Wrapper";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type UploadPageProps = {};

const UploadPage: NextPageWithLayout<UploadPageProps> = () => {
  return <Upload />;
};

UploadPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<UploadPageProps> = async ({
  locale,
  req,
  res,
  query,
}) => {
  return {
    props: {},
  };
};

export default UploadPage;
