import React, { useEffect, useState } from "react";
import qs from "qs";
import { Table } from "antd";
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
  },
  // {
  //   title: "Gender",
  //   dataIndex: "gender",
  //   filters: [
  //     {
  //       text: "Male",
  //       value: "male",
  //     },
  //     {
  //       text: "Female",
  //       value: "female",
  //     },
  //   ],
  //   width: "20%",
  // },
  {
    title: "create_by",
    dataIndex: "gender",
    sorter: true,
  },
  {
    title: "update_by",
    sorter: true,
    dataIndex: "email",
  },
  {
    sorter: true,
    title: "create_at",
    dataIndex: "email",
  },
  {
    sorter: true,
    title: "update_at",
    dataIndex: "email",
  },
  {
    title: "action",
    dataIndex: "email",
    render: () => (
      <p className="">
        <a className="p-3 bg-red-700 rounded-md text-white mr-4 hover:bg-red-500 hover:text-white">
          Update
        </a>
        <a className="p-3 bg-green-700 rounded-md text-white hover:bg-green-500 hover:text-white">
          Remove
        </a>
      </p>
    ),
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const DataTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default DataTable;
