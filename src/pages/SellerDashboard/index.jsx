// DashboardLayout.js
import React from 'react';
import { Layout, Menu, Typography, Input, Button } from 'antd';
import { AppstoreOutlined, BarChartOutlined, UserOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Admin from './Admin';
import { useAuthContext } from '../../context/Auth';
import Order from './Order';
import Products from './Products';
import Customer from './Customer';
import ProfileSettings from './ProfileSettings';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const SellerDashboard = () => {
    const { handleLogout } = useAuthContext()

    const pathKeyMap = {
        '/dashboard/admin': '1',
        '/dashboard/product/*': '2',
        '/dashboard/orders': '3',
        '/dashboard/customers': '4',
        '/dashboard/settings': '5',
    };

    const location = useLocation();
    const selectedKey = location.pathname.includes(pathKeyMap) // Adjust logic as needed

    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }} className="custom-sider">
                <div className="logo text-center py-4 fw-bold text-black">Shop.co</div>
                <Menu mode="inline"
                    selectedKeys={[pathKeyMap[selectedKey]]}
                    className="menu-light">
                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        <Link to="/dashboard/admin">Overview</Link>
                    </Menu.Item>
                    <SubMenu key="2" icon={<AppstoreOutlined />} title="Products">
                        <Menu.Item key="2-1">
                            <Link to="/dashboard/product/all">Manage Products</Link>
                        </Menu.Item>
                        <Menu.Item key="2-2">
                            <Link to="/dashboard/product/add">Add Products</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
                        <Link to="/dashboard/orders">Orders</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link to="/dashboard/customers">Customer</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<SettingOutlined />}>
                        <Link to="/dashboard/settings">Store Setting</Link>
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
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/product/*' element={<Products />} />
                        <Route path='/orders' element={<Order />} />
                        <Route path='/customers' element={<Customer />} />
                        <Route path='/settings' element={<ProfileSettings />} />
                    </Routes>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default SellerDashboard;
