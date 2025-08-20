import React from 'react'
import { Button, Col, Row, Typography } from 'antd'
// import Website from "../../../Assets/images/Website.svg"


const { Title, Paragraph } = Typography

const Hero = () => {
    return (
        <div style={{backgroundColor: "#ededed"}}>
            <div className="container">
                <Row className='justify-content-center text-center'>
                    <Col xs={24} sm={24} md={24} lg={12} className='my-5 text-start'>
                        <Title level={1} className=' mb-0 text-black' style={{fontSize:"75px"}}>Find Clothes That Matches Your Style</Title>
                        <Paragraph className='text-black'>Driven by quality, inspired by culture, and powered by convenience, Shop.Co is more than just a store — it's your go-to style partner.</Paragraph>
                            <Button type="primary" color='default' shape="round" size='large' variant='solid' className='w-30' >Shop Now</Button>
                        <Row className='my-4'>
                            <Col span={8}>
                            <Title level={2} className='mb-0'>200+</Title>
                            <Paragraph>International Brands</Paragraph>
                            </Col>
                            <Col span={8}>
                            <Title level={2} className='mb-0'>2000+</Title>
                            <Paragraph>High Quality Products</Paragraph>
                            </Col>
                            <Col span={8}>
                            <Title level={2} className='mb-0'>30k+</Title>
                            <Paragraph>Happy Customers</Paragraph>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} className='h-100'>
                        <img src="https://res.cloudinary.com/djpvxvokp/image/upload/v1755674366/Website_xivybs.svg" alt="Fashion" className='img-fluid' style={{ maxHeight: '650px' }} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero
