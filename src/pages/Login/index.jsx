import React, { useState } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { WarningFilled, CheckCircleFilled } from "@ant-design/icons";
const Login = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [
      {
        id: 1,
        username: "admin",
        email: "admin@gmail.com",
        password: "1",
        confirm: "1",
      },
    ]
  );

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationError = () => {
    api.open({
      message: "Login fail!",
      description: "Username or password incorrect!",
      duration: 0,
      icon: <WarningFilled className="text-red-500" />,
    });
  };
  const openNotificationSuccess = () => {
    api.open({
      message: "Login success!",
      duration: 0,
      icon: <CheckCircleFilled className="text-green-500" />,
    });
  };
  const onFinish = (values) => {
    const result = users.filter(
      (user) =>
        user.username === values.username && user.password === values.password
    );
    if (result.length !== 0) {
      openNotificationSuccess();
      localStorage.setItem("userLogged", JSON.stringify(result));
      setTimeout(() => navigate("/events"), 1000);
    } else {
      openNotificationError();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {contextHolder}
      <div className="flex h-[100vh] ">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="m-auto p-10 shadow-xl rounded-xl "
        >
          <Form.Item>
            <Title className="!text-primary translate-x-[50%]">Login</Title>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" className="bg-primary">
              Login
            </Button>

            <Button
              className="outline-none border-none text-primary ml-4 shadow-none"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
