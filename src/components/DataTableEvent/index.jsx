import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Space, Table, Modal } from "antd";
import DataTable from "../../components/DataTableEvent";

const CheckIn = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [columns, setColumns] = useState([
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Create By",
      dataIndex: "create_by",
    },
    {
      title: "Update By",
      dataIndex: "update_by",
    },
    {
      title: "Create At",
      dataIndex: "create_at",
    },
    {
      title: "Update At",
      dataIndex: "update_at",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-primary"
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            type="primary"
            danger
            className=""
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]);
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this event?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setData((pre) => {
          const newData = pre.filter((event) => event.id !== record.id);
          localStorage.setItem("events", JSON.stringify(newData));
          return newData;
        });
      },
    });
  };

  const handleCreate = (values) => {
    const timeNow = new Date(Date.now()).toLocaleString().split(",")[0];

    const eventItem = {
      id: 1,
      name: values.name,
      create_at: timeNow,
      create_by: "Tuan",
      update_at: timeNow,
      update_by: "Tuan",
    };
    if (data.length !== 0) eventItem.id = data[data.length - 1].id + 1;
    setData((prev) => {
      const newData = [...prev, eventItem];
      localStorage.setItem("events", JSON.stringify(newData));
      return newData;
    });
    setOpen(false);
  };

  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={data} />;
    </div>
  );
};
export default CheckIn;
