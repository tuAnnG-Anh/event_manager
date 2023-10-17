import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import DataTable from "../../components/DataTable";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{ className: "bg-primary" }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const Event = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );

  const onCreate = (values) => {
    const eventItem = {
      id: 1,
      key: Math.floor(Math.random() * 1000),
      name: values.name,
    };
    console.log(data);
    setData((prev) => {
      const newData = [...prev, eventItem];
      localStorage.setItem("events", JSON.stringify(newData));
      return newData;
    });
    setOpen(false);
  };
  useEffect(() => {});
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
        className="bg-primary"
      >
        New Event
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DataTable data={data} />
    </div>
  );
};
export default Event;
