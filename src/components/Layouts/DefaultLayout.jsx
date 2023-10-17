import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  HeatMapOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function DefaultLayout({ props, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout className="min-h-[100vh]">
      <Sider
        trigger={null}
        collapsible
        collapsed={!collapsed}
        // onMouseOut={() => setCollapsed(!collapsed)}
        className=""
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              icon: <CalendarOutlined />,
              label: "Events",
              onClick: () => navigate("/events"),
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "Customer",
              onClick: () => navigate("/customer"),
            },
            {
              key: "4",
              icon: <HeatMapOutlined />,
              label: "Checkin manager",
              onClick: () => navigate("/checkin"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
export default DefaultLayout;
