import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import { Button, Menu, Table, Input, message, Layout, Space, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, ExportOutlined } from '@ant-design/icons';
import { getStudents,axiosPostLogout } from './services/api-service';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { LogoutOutlined } from '@ant-design/icons';
import { removeUserData } from "./services/storage";
import { DashboardLayout } from "./dashboard/layout";


const { Header, Sider, Content } = Layout;
const { Search } = Input;

const initialValues = {
  current: 1, //用户每次点 state都会变 （前端发到后端）
  pageSize: 20, //pageSize 也是用户输入的数据，用户改变pagesize,每页显示的内容会有变化 （前端发到后端）
  //total: 10 // （后端发给前端）
};

export default function Student() {
  const router = useRouter();
  //for table
  //程序员叫了useState，只要用useState 就会返回array， array里有两个值，分别是 xxx,和 setXxx，
  const [students, setStudents] = useState([]);
  const [paginationConfig, setPagination] = useState(initialValues);
  //for search
  const [searchInput, setSearchInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(()=> {

    // 1) axios.get 
    //page 1, limit 20
    // 2) 把数据显示在UI上 
    // 3) 用户改变page/limit的时候，又回到1),更新过的数据再次显示在UI上
    // 一定会用到的东西 
    getStudents(searchInput,paginationConfig.current,paginationConfig.pageSize)
    .then((res) => {
      const students = res.data.data.students;
      console.log(res.data.data);
      setStudents(students);
      //
      setPagination({
        ...paginationConfig,
        total: res.data.data.total
      });
      console.log(paginationConfig)
    })
    .catch(e => message.info(e.message));
    }, [paginationConfig.current, searchInput]
    //[paginationConfig.current, searchInput]是这个useeffect里的第二个参数，
    //意思是当paginationConfig.current state或者是  searchInput state的值发生变化，就跑useEffect
  );

  const onPageChange = page => {
    debugger
    setPagination({
      //spread operator
      ...paginationConfig,
      current: page
    });
  };

  const onSearchChange = e => {
  };

  const onSearch = value => {
  };

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

  const columns = [
    {
      title:'No.',
      key: 'index',
      render: (_1, _2, index) => index + 1,
    },
    {
      title:'Name',
      width: "15%",
      dataIndex: 'name',
      render: (name,student) => {
        return (
          <Link href={`./student-list/${student.id}`}>{name}</Link>
        )
      },
      sorter: (a,b) => (a.name.charCodeAt(0)-b.name.charCodeAt(0))
    },
    {
      title: "Area",
      width: "20%",
      dataIndex:'country',
      onFilter: (value, student) =>  student.country === value
    },
    {
      title: "Email",
      width: "20%",
      dataIndex:'email',
      onFilter: (value, student) => student.Email === value
    },
    {
      title: "Selected Curriculum",
      width: "20%",
      dataIndex:'courses',
      render:(courses) =>
      courses.map((subItem) => subItem.name).join(", ") 
    },
    {
      title: "Student Type",
      dataIndex: ["type", "name"],
      width: "15%",
      filters: [
        {
          text: "developer",
          value: "developer"
        },
        {
          text: "tester",
          value: "tester"
        },
      ],
      onFilter: (value, student) =>  student.type.name === value
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: joinTime => {
        return formatDistanceToNow(new Date(joinTime), { addSuffix: true });
      },    
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        );
      }
    },
  ];

  return (
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
            <Search
              placeholder="Search by student name"
              onSearch={onSearch}
              onChange={onSearchChange}
            />
            <Table
              pagination={
                {
                  current: paginationConfig.current,
                  pageSize: paginationConfig.pageSize,
                  total: paginationConfig.total,
                  responsive: true,
                  showSizeChanger: false,
                  onChange: (page) => onPageChange(page)
                  }
              }
              rowKey="id"
              dataSource={students}
              columns={columns}
              />    
          </Content>
        </Layout>
    </Layout>
  );
}
