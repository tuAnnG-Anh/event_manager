import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import DataTable from "../../components/DataTable";
const CollectionCreateForm = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [event, setEvent] = useState({});
  // const [open, setOpen] = useState(open);
  const [events, setEvents] = useState(localStorage.getItem("events"));
  const time = new Date();
  const date = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}`;
  const onCreate = (values) => {
    setEvents((pre) => [...pre, event]);
  };
  console.log(events);
  return (
    <Modal
      open={open}
      title="Create a new event"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
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
          onChange={(e) => setEvent(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input the title of event!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const Event = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // localStorage.setItem("events", JSON.stringify(events));
  }, [event]);
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          className="bg-primary mb-8 p-5 leading-normal flex items-center"
        >
          New Event
        </Button>
        <CollectionCreateForm
          open={open}
          // onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
};
export default Event;
