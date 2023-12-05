import { type FC, useState, useEffect } from "react";
import clsx from "clsx";

import { useRequireAuth } from "@/hooks";
import { useGetReports } from "@/hooks/Keyword";

import { KeywordTable } from "@/src/components/Table";
import { Report as ReportType } from "@/hooks/Keyword/types";

export const Reports: FC = () => {
  useRequireAuth();

  const { data, mutate, loading } = useGetReports();

  const [reports, setReports] = useState<ReportType[]>([]);

  useEffect(() => {
    setReports(data ?? []);
  }, [data]);

  return (
    <div
      id="reports"
      className={clsx(
        "flex flex-col flex-1 items-center justify-center ",
        "pt-4 lg:pt-14 pb-4",
        "w-full"
      )}
    >
      <h2 className={clsx("mb-6", "font-semibold text-lg")}>Your Reports</h2>

      <div>
        <KeywordTable dataSource={reports} refetch={mutate} loading={loading} />
      </div>
    </div>
  );
};
