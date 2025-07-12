import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Order from '../Order';
import { useAuthContext } from '../../../context/Auth';
import axios from 'axios';
const { Title, Text } = Typography;



const Admin = () => {
  const { user } = useAuthContext()
  const [orders, setOrders] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [averageOrder, setAverageOrder] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get('https://shop-co-nbni.vercel.app/dashboard/order', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Must be "Bearer <token>"
          }
        })
        const fetchedOrders = res.data.orders || [];
        setOrders(fetchedOrders);

        // ✅ Calculate total and average
        const total = fetchedOrders.reduce((sum, order) => {
          const orderTotal = order.cart?.reduce((subtotal, item) => {
            return subtotal + (parseFloat(item?.selectedVariant?.price || 0) * item?.quantity);
          }, 0);
          return sum + orderTotal;
        }, 0);

        const count = fetchedOrders.length;
        setTotalEarnings(total.toFixed(2));
        setAverageOrder(count > 0 ? (total / count).toFixed(2) : 0);
      } catch (err) {
        console.error("Error fetching orders:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])


  return (
    <div className="overview-content">
      <Title level={3}>Welcome back, <b>{user.firstName}</b>!</Title>
      <Text>Here's Your Current Sales Overview</Text>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={12} lg={8} className='sm-mb-4'>
          <Card className="metric-card" bordered={false}>
            <Text className="text-white">AVG. Order Value</Text>
            <Title level={4} className="text-white">$ {averageOrder} <ArrowUpOutlined style={{ color: 'green' }} /></Title>
            <Text>
              <span className="text-success fw-bold">+18%</span>{' '}
              <span className="text-white">from last month</span>
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card className="metric-card" bordered={false}>
            <Text className="text-white">Total Orders</Text>
            <Title level={4} className="text-white">$ {totalEarnings} <ArrowDownOutlined style={{ color: 'red' }} /></Title>
            <Text>
              <span className="text-danger fw-bold">-13.1%</span>{' '}
              <span className="text-white">from last month</span>
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card className="metric-card" bordered={false}>
            <Text className="text-white">Lifetime Value</Text>
            <Title level={4} className="text-white">$ {totalEarnings} <ArrowUpOutlined style={{ color: 'green' }} /></Title>
            <Text>
              <span className="text-success fw-bold">+27%</span>{' '}
              <span className="text-white">from last month</span>
            </Text>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Order />
      </Card>
    </div>
  );
};

export default Admin;
