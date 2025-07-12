import React from 'react'
import { Button, Col, Row, Typography, Form, Input } from 'antd'

const { Title} = Typography
const NewsLetter = () => {
  return (
      <div className="container py-5 bg-black rounded-5">
                <Row gutter={[16, 16]} align="middle" justify="center" className='mx-auto'>
                    <Col xs={24} md={16}>
                        <Title className="text-white text-center text-md-start">
                            STAY UP TO DATE ABOUT OUR LATEST OFFERS
                        </Title>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form>
                            <Input
                                type="email" placeholder="Please Enter Your Email" className="form-control rounded-5" />
                            <Button
                                type="primary" color='default' variant='outlined' block shape="round" size="large" className="mt-3">Subscribe to our NewsLetter</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
  )
}

export default NewsLetter
