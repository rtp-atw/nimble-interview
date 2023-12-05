import { Report } from "@modules/Users";

import { getLayout } from "@components/Layout/Wrapper";

import { type GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/src/pages/_app";

type ReportPageProps = {
  id: string;
};

const ReportPage: NextPageWithLayout<ReportPageProps> = ({ id }) => {
  return <Report id={id} />;
};

ReportPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<ReportPageProps> = async ({
  query,
}) => {
  let id = query.id;

  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  if (Array.isArray(id)) {
    id = id[0];
  }

  return {
    props: {
      id: id,
    },
  };
};

export default ReportPage;
