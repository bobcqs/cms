import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import { Button, Menu, message, Layout, Space, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, ExportOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout(props) {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [paginationConfig, setPagination] = useState(initialValues);
  const [searchInput, setSearchInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    axiosPostLogout().then((res) => {
        removeUserData('key');
        router.push("/")
      }
    ).catch((e) => {
      message.info(e.message);
    });
  };

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a  href="#" onClick={logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
    <Head>
        <title>Dashboard</title>
      </Head>
    <Layout>  
        <Sider >
          <div className="logo">
            CMS
          </div>
          <Button type="primary" onClick={toggle} style={{ marginBottom: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            inlineCollapsed={collapsed}
          >
            <Menu.Item key="2">Student List</Menu.Item>
            <Menu.Item><a onClick={logout}>Logout</a></Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header>
              <Row align="middle">
                <LogoutOutlined  onClick={logout} />
              </Row>
          </Header>

          <Content>
            {props}    
          </Content>
        </Layout>
    </Layout>
    </>
  );
}
