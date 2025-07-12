// DashboardLayout.js
import React from 'react';
import { Layout, Menu,  Input, Button } from 'antd';
import { BarChartOutlined, EnvironmentOutlined  , SearchOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Admin from './Admin';
import { useAuthContext } from '../../context/Auth';
import Order from './Order';
import Address from './Address';
import Settings from './Settings';

const { Header, Sider, Content } = Layout;
const CustomerDashboard = () => {
    const { handleLogout } = useAuthContext()

    const pathKeyMap = {
        '/customer': '1',
        '/customer/orders': '2',
        '/customer/address': '3',
        '/customer/profile-settings': '4',
    };

    const location = useLocation();
    const selectedKey = location.pathname.includes(pathKeyMap) // Adjust logic as needed

    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }} className="custom-sider">
                <div className="logo text-center py-4 fw-bold text-black">Shop.co</div>
                <Menu mode="inline" selectedKeys={[selectedKey]} className="menu-light">
                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        <Link to="/customer/overview">Overview</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                        <Link to="/customer/order">Orders</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<EnvironmentOutlined  />}>
                        <Link to="/customer/address">Manage Address</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SettingOutlined />}>
                        <Link to="/customer/profile-settings">Profile Setting</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header className="topbar d-flex justify-content-between align-items-center px-4">
                    <Input prefix={<SearchOutlined />} placeholder="Search..." style={{ width: 300 }} />
                    <div className="d-flex align-items-center">
                        <Button type="primary" color='default' variant='solid' htmlType="submit" onClick={handleLogout}>Logout</Button>
                    </div>
                </Header>

                <Content className="dashboard-content px-4 py-4">
                    <Routes>
                        <Route path='/overview' element={<Admin />} />
                        <Route path='/order' element={<Order />} />
                        <Route path='/address' element={<Address />} />
                        <Route path='/profile-settings' element={<Settings />} />
                    </Routes>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default CustomerDashboard;
