import { type FC, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";
import parse from "html-react-parser";
import { debounce } from "lodash";

import { useRequireAuth } from "@/hooks";
import { useGetReport } from "@/hooks/Keyword";

import { Report as ReportType } from "@/hooks/Keyword/types";
import { Button } from "@/src/components/Button";

type ReportProps = {
  id: string;
};
export const Report: FC<ReportProps> = ({ id }) => {
  useRequireAuth();

  const { data, mutate, loading } = useGetReport(id);

  const [report, setReport] = useState<ReportType>();

  const handleDebouceRefetch = useMemo(
    () => debounce(() => mutate(), 500, { leading: false }),
    [mutate]
  );

  useEffect(() => {
    setReport(data);
  }, [data]);

  return (
    <>
      <div className="mt-4">
        <Link
          href={"/users/reports"}
          className="text-blue-500 hover:text-blue-600 cursor-pointer "
        >
          {`< Back`}{" "}
        </Link>
      </div>
      <div
        id="report"
        className={clsx(
          "flex flex-col flex-1 items-center justify-center ",
          "pt-2 lg:pt-10 pb-4",
          "w-full"
        )}
      >
        <h2 className={clsx("mb-6", "font-semibold text-lg")}>
          Your Report #{id}
        </h2>

        {report && !loading && (
          <>
            <div className="mb-2 ml-auto">
              <Button
                block={false}
                small
                onClick={handleDebouceRefetch}
                className="ml-auto"
                disabled={loading}
              >
                Refresh
              </Button>
            </div>
            <div
              className={clsx(
                "grid grid-flow-row w-full",
                "grid-cols-2 md:grid-cols-4",
                "gap-4"
              )}
            >
              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>ID:</p>
                <div>{report.id}</div>
              </div>
              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>
                  Status:
                </p>
                <div>{report.is_extracted ? "Success" : "Processing"}</div>
              </div>
              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>
                  Keyword:
                </p>
                <div>{report.keyword}</div>
              </div>

              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>Ads:</p>
                <div>{report.ads.toLocaleString()}</div>
              </div>
              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>Links:</p>
                <div>{report.links.toLocaleString()}</div>
              </div>
              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>
                  Total Result:
                </p>
                <div>{report.total_result.toLocaleString()}</div>
              </div>
              <div className={clsx("col-span-1")}>
                <p className={clsx("block", "text-lg font-semibold")}>
                  Process Time:
                </p>
                <div>{report.precess_time}</div>
              </div>
              <div className={clsx("col-span-2 md:col-span-4")}>
                <p className={clsx("block", "text-lg font-semibold")}>HTML:</p>
                <div
                  className={clsx("relative overflow-auto", "max-h-[480px]")}
                >
                  {parse(report.html)}
                  {/* <pre>
                    <code>{report.html}</code>
                  </pre> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
