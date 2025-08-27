import React from 'react'
import { Col, Divider, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography
const Menu = () => {
  return (
    <>
      <div className="container pt-5">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={12} lg={6} >
            <Title level={2} className='mb-0'>Shop.Co</Title>
            <Paragraph className='py-1'>Shop.Co is a modern, trend-forward fashion destination where style meets convenience. Built for both men and women, Shop.Co curates a diverse collection of everyday essentials — all in one place.</Paragraph>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} >
            <Title level={5}>Company</Title>
            <Link to='/about' className="nav-link py-1">About</Link>
            <Link to='/' className="nav-link py-1">Features</Link>
            <Link to='/' className="nav-link py-1">Works</Link>
            <Link to='/' className="nav-link py-1">Careers</Link>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} >
            <Title level={5}>Help</Title>
            <Link to='/' className="nav-link py-1">Customer Service</Link>
            <Link to='/' className="nav-link py-1">Delivery Details</Link>
            <Link to='/' className="nav-link py-1">Terms & Condition</Link>
            <Link to="/privacy-policy" className="nav-link py-1">Privacy Policy</Link>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} >
            <Title level={5}>FAQ</Title>
            <Link to='/customer/overview' className="nav-link py-1">Account</Link>
            <Link to='/customer/order' className="nav-link py-1">Order</Link>
            <Link to='/' className="nav-link py-1">Delivery</Link>
            <Link to='/' className="nav-link py-1">Payments</Link>
          </Col>
        </Row>
      </div>
      <div className="container">
        <Divider style={{ borderColor: '#222' }} />
      </div>
    </>
  )
}

export default Menu
