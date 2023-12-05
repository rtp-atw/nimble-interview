import { FC } from "react";
import Link from "next/link";
import { Table } from "antd/lib";

import type { Report } from "@/hooks/Keyword/types";
import type { ColumnsType } from "antd/es/table";

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
  },
  {
    title: "Action",
    key: "action",

    render: (_, record) => (
      <div>
        <Link
          href={`/users/keyword/${record.id}`}
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
};
export const KeywordTable: FC<KeywordTableProps> = ({ dataSource }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 15 }}
      scroll={{ x: 900 }}
    />
  );
};

export default KeywordTable;
