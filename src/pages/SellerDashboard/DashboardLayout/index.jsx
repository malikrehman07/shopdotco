import React from 'react';
import { Layout, Menu, Typography, Input, Button } from 'antd';
import { AppstoreOutlined, BarChartOutlined, UserOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;

const SellerDashboard = () => {
  const { handleLogout } = useAuthContext();
  const location = useLocation();

  const pathKeyMap = {
    '/dashboard/admin': '1',
    '/dashboard/products': '2',
    '/dashboard/order': '3',
    '/dashboard/customer': '4',
    '/dashboard/setting': '5',
  };

  const selectedKey = Object.keys(pathKeyMap).find((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="custom-sider"
      >
        <div className="logo text-center py-4 fw-bold text-black">Shop.co</div>
        <Menu
          mode="inline"
          selectedKeys={[pathKeyMap[selectedKey] || '1']}
          className="menu-light"
        >
          <Menu.Item key="1" icon={<BarChartOutlined />}>
            <Link to="/dashboard/admin">Overview</Link>
          </Menu.Item>
          <SubMenu key="2" icon={<AppstoreOutlined />} title="Products">
            <Menu.Item key="2-1">
              <Link to="/dashboard/products/all">Manage Products</Link>
            </Menu.Item>
            <Menu.Item key="2-2">
              <Link to="/dashboard/products/add">Add Products</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
            <Link to="/dashboard/order">Orders</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/dashboard/customer">Customer</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <Link to="/dashboard/setting">Store Setting</Link>
          </Menu.Item>
        </Menu>
        <div className="upgrade-box px-3 py-3 text-center">
          <Text className="text-white">
            Discover new features to detailed report and analysis
          </Text>
          <Button type="primary" block className="mt-2">
            Upgrade Now
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header className="topbar d-flex justify-content-between align-items-center px-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            style={{ width: 300 }}
          />
          <div className="d-flex align-items-center">
            <Button
              type="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content className="dashboard-content px-4 py-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerDashboard;
