import React from 'react'
import { Col, Row, Typography } from 'antd'


const { Title } = Typography
const Brands = () => {
  return (
    <>
      <div className='bg-black'>
                <div className="container">
                    <Row gutter={16}className='text-center'>
                        <Col xs={12} sm={12} md={12} lg={6} className='my-3 text-center'><Title level={2} className='text-white m-0'>CALVIN KLEIN</Title></Col>
                        <Col xs={12} sm={12} md={12} lg={6} className='my-3 text-center'><Title level={2} className='text-white m-0'>GUCCI</Title></Col>
                        <Col xs={12} sm={12} md={12} lg={6} className='my-3 text-center'><Title level={2} className='text-white m-0'>VERSACE</Title></Col>
                        <Col xs={12} sm={12} md={12} lg={6} className='my-3 text-center'><Title level={2} className='text-white m-0'>PRADA</Title></Col>
                    </Row>
                </div>
            </div>
    </>
  )
}

export default Brands
