import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Table } from "antd/lib";
import { debounce } from "lodash";

import type { Report } from "@/hooks/Keyword/types";
import type { ColumnsType } from "antd/es/table";
import type { Key } from "antd/lib/table/interface";

import { Button } from "../Button";
import { Input } from "../Inputs";

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
    filterMode: "tree",
    filterSearch: true,
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    onFilter: (value: boolean | Key, record: Report) => {
      if (typeof value === "boolean") return true;
      return record.keyword.startsWith(value.toString());
    },
    sorter: {
      compare: (a, b) => a.id - b.id,
    },
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
  const [searchText, setSearchText] = useState<string>();

  const handleRefetch = useCallback(() => {
    if (!refetch) return;
    refetch();
  }, [refetch]);

  const handleDebouceRefetch = useMemo(
    () => debounce(handleRefetch, 500, { leading: false }),
    [handleRefetch]
  );

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const handleDebouceSearch = useMemo(
    () => debounce(handleSearch, 0, { leading: false }),
    [handleSearch]
  );

  const filteredDataSource = useMemo(() => {
    if (!searchText) return dataSource;
    if (searchText === "") return dataSource;

    return [...dataSource].reduce((p, c) => {
      if (!c.keyword.includes(searchText)) {
        return p;
      }
      p = p.concat([c]);
      return p;
    }, [] as Report[]);
  }, [dataSource, searchText]);

  return (
    <>
      <div className="mb-4 ">
        {refetch && (
          <Button
            block={false}
            small
            onClick={handleDebouceRefetch}
            className="ml-auto"
            disabled={loading}
          >
            Refresh
          </Button>
        )}
        <Input
          block={false}
          placeholder="Search.."
          round={false}
          className="rounded-lg min-w-[240px]"
          onChange={handleDebouceSearch}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredDataSource}
        pagination={{ pageSize: 15 }}
        // scroll={{ x: 1000 }}
        loading={loading}
      />
    </>
  );
};

export default KeywordTable;
