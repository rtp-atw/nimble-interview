import { FC, useCallback, useMemo } from "react";
import Link from "next/link";
import { Table } from "antd/lib";
import { debounce } from "lodash";

import type { Report } from "@/hooks/Keyword/types";
import type { ColumnsType } from "antd/es/table";
import { Button } from "../Button";

const columns: ColumnsType<Report> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a, b) => a.id - b.id,
    },
  },
  {
    title: "Keyword",
    dataIndex: "keyword",
    key: "keyword",
  },
  {
    title: "Number of Ads",
    dataIndex: "ads",
    key: "ads",
    sorter: {
      compare: (a, b) => a.ads - b.ads,
    },
  },
  {
    title: "Number of link",
    key: "links",
    dataIndex: "links",
    sorter: {
      compare: (a, b) => a.links - b.links,
    },
  },
  {
    title: "Total result",
    key: "total_result",
    dataIndex: "total_result",
    sorter: {
      compare: (a, b) => a.total_result - b.total_result,
    },
  },
  {
    title: "Process time",
    key: "precess_time",
    dataIndex: "precess_time",
    sorter: {
      compare: (a, b) => a.precess_time - b.precess_time,
    },
  },
  {
    title: "Status",
    key: "is_extracted",
    dataIndex: "is_extracted",
    sorter: {
      compare: (a, b) =>
        a.is_extracted === b.is_extracted ? 0 : a.is_extracted ? -1 : 1,
    },
    render: (_, record) => {
      return (
        <div>
          {record.is_extracted && "Success"}
          {!record.is_extracted && "Processing"}
        </div>
      );
    },
  },
  {
    title: "HTML",
    key: "html",
    dataIndex: "html",
    responsive: ["xxl"],
    width: 120,
    ellipsis: true,
  },
  {
    title: "Action",
    key: "action",

    render: (_, record) => (
      <div>
        <Link
          href={`/users/reports/${record.id}`}
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
        >
          View
        </Link>
      </div>
    ),
  },
];

export type KeywordTableProps = {
  dataSource: Report[];
  refetch?: () => void;
  loading?: boolean;
};
export const KeywordTable: FC<KeywordTableProps> = ({
  dataSource,
  refetch,
  loading,
}) => {
  const handleRefetch = useCallback(() => {
    if (!refetch) return;
    refetch();
  }, [refetch]);

  const handleDebouceRefetch = useMemo(
    () => debounce(handleRefetch, 500, { leading: false }),
    [handleRefetch]
  );

  return (
    <>
      <div className="mb-4 ">
        <Button
          block={false}
          small
          onClick={handleDebouceRefetch}
          className="ml-auto"
          disabled={loading}
        >
          Reload
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 15 }}
        scroll={{ x: 900 }}
        loading={loading}
      />
    </>
  );
};

export default KeywordTable;
