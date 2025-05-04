import React from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

const InstructorDashboardpage = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/instructor',
      icon: <BookOutlined />,
      label: <Link to="/instructor">Courses</Link>,
    },
    {
      key: '/instructor/learning-pathways',
      icon: <RightCircleOutlined />,
      label: <Link to="/instructor/learning-pathways">Learning Pathways</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default InstructorDashboardpage;