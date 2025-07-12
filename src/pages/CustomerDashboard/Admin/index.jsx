import React from 'react';
import { Card, Row, Col, Typography} from 'antd';
import Order from '../Order';
import { useAuthContext } from '../../../context/Auth';
import { Link } from 'react-router-dom';
const { Title, Paragraph}  = Typography;



const Admin = () => {
  const {user} = useAuthContext()
  return (
    <div className="overview-content">
      <Title level={3}>Welcome back, <b>{user.firstName}</b>!</Title>
      <Title level={3} className='text-center' >Manage My Account</Title>

      <Row gutter={[16,16]} className="mt-4">
        <Col xs={24} md={12} lg={8}>
          <Card className="metric-card" bordered={false}>
            <Title level={3} className="text-white">Personal Profile</Title>
            <Paragraph className='my-1 ' >{user.firstName + " " + user.lastName }</Paragraph>
            <Paragraph className='my-1' >{user.email}</Paragraph>
            <Link to='' className='my-1' >Edit</Link>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card className="metric-card" bordered={false}>
            <Title level={3} className="text-white">Default Shipping Address</Title>
            <Paragraph className='my-1 ' >{user.firstName + " " + user.lastName }</Paragraph>
            <Paragraph className='my-1' >{user.email}</Paragraph>
            <Link to='' className='my-1' >Edit</Link>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card className="metric-card" bordered={false}>
            <Title level={3} className="text-white">Default Billing Address</Title>
            <Paragraph className='my-1 ' >{user.firstName + " " + user.lastName }</Paragraph>
            <Paragraph className='my-1' >{user.email}</Paragraph>
            <Link to='' className='my-1' >Edit</Link>
          </Card>
        </Col>
      </Row>

          <Card className="mt-4">
            <Order/>
          </Card>
    </div>
  );
};

export default Admin;
