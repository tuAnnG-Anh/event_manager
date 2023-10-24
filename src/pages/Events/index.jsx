import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Space, Table, Modal, message } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const EventCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new event"
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
function isValid(p) {
  var phoneRe =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
}
const Event = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("events")) || [
      {
        id: 1,
        name: "Women Day",
        create_at: "10/24/2023",
        create_by: "admin",
        update_at: "10/24/2023",
        update_by: "admin",
      },
      {
        id: 2,
        name: "Tet holiday",
        create_at: "10/24/2023",
        create_by: "admin",
        update_at: "10/24/2023",
        update_by: "admin",
      },
      {
        id: 4,
        name: "30/4",
        create_at: "10/24/2023",
        create_by: "admin",
        update_at: "10/24/2023",
        update_by: "admin",
      },
      {
        id: 5,
        name: "2/9",
        create_at: "10/24/2023",
        create_by: "admin",
        update_at: "10/24/2023",
        update_by: "admin",
      },
    ]
  );
  const [userLogged, setUserLogger] = useState(
    JSON.parse(localStorage.getItem("userLogged")) || []
  );
  const [dataCustomer, setDataCustomer] = useState(
    JSON.parse(localStorage.getItem("customers")) || []
  );
  const [dataChecked, setDataChecked] = useState(
    JSON.parse(localStorage.getItem("checked")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [checkedEvent, setCheckdedEvent] = useState({});

  const [editingEvent, setEditingEvent] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
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
            icon={<EditOutlined />}
          >
            Update
          </Button>
          <Button
            type="primary"
            danger
            className=""
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
          <Button
            type=""
            className="bg-green-600 text-white hover:bg-green-500"
            onClick={() => handleCheck(record)}
            icon={<CheckCircleOutlined />}
          >
            Check
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
          message.success("Deleted!");
          return newData;
        });
      },
    });
  };
  const handleCheck = (record) => {
    setOpenSearch(true);
    setCheckdedEvent(() => {
      return { ...record };
    });
  };
  const handleCreate = (values) => {
    const timeNow = new Date(Date.now()).toLocaleString().split(",")[0];
    console.log(userLogged);
    const eventItem = {
      id: 1,
      name: values.name,
      create_at: timeNow,
      create_by: userLogged[0].username,
      update_at: timeNow,
      update_by: userLogged[0].username,
    };
    if (data.length !== 0) eventItem.id = data[data.length - 1].id + 1;
    setData((prev) => {
      const newData = [...prev, eventItem];
      localStorage.setItem("events", JSON.stringify(newData));
      message.success("Create success!");
      return newData;
    });
    setOpen(false);
  };
  const handleUpdate = (record) => {
    setIsEditing(true);
    setEditingEvent(() => {
      const timeNow = new Date(Date.now()).toLocaleString().split(",")[0];
      return {
        ...record,
        update_at: timeNow,
        update_by: userLogged[0].username,
      };
    });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEvent(null);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
        className="bg-primary mb-6 flex p-4 items-center"
        icon={<PlusOutlined />}
      >
        New Event
      </Button>
      <EventCreateForm
        open={open}
        onCreate={handleCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Table rowKey="id" columns={columns} dataSource={data} />;
      <Modal
        title="Edit event"
        open={isEditing}
        okButtonProps={{ className: "bg-primary" }}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setData((pre) => {
            const newData = pre.map((event) => {
              if (event.id === editingEvent.id) {
                return editingEvent;
              } else {
                return event;
              }
            });
            localStorage.setItem("events", JSON.stringify(newData));
            message.success("Updated!");

            return newData;
          });
          resetEditing();
        }}
      >
        <Input
          value={editingEvent?.name}
          onChange={(e) => {
            setEditingEvent((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
      </Modal>
      <Modal
        title="Search phone number"
        open={openSearch}
        okButtonProps={{ className: "bg-primary" }}
        okText="Check"
        onCancel={() => {
          setOpenSearch(false);
        }}
        onOk={() => {
          if (!isValid(phoneNumber)) {
            return message.error("This phone number is not valid!");
          }
          var checkedState = false;
          dataCustomer.map((customer) => {
            if (customer.phone == phoneNumber) {
              const timeNow = new Date(Date.now())
                .toLocaleString()
                .split(",")[0];
              const newChecked = {
                id: 1,
                event_id: checkedEvent.id,
                customer_id: customer.id,
                checked_at: timeNow,
                checked_by: userLogged[0].username,
                created_at: timeNow,
                updated_at: timeNow,
              };
              if (dataChecked.length !== 0)
                newChecked.id = dataChecked[dataChecked.length - 1].id + 1;
              setDataChecked((prev) => {
                const newData = [...prev, newChecked];
                localStorage.setItem("checked", JSON.stringify(newData));
                message.success("Checked!");
                checkedState = true;
                setPhoneNumber("");
                setOpenSearch(false);
                return newData;
              });
            }
          });
          if (!checkedState) message.error("This number phone is not defind!");
        }}
      >
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Modal>
    </div>
  );
};
export default Event;
