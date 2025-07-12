import React from 'react'
import { Button, Col, Divider, Row, Typography } from 'antd'
import ProductSection from '../ProductSection';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography
const NewArrival = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="container py-5">
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-center'>NEW ARRIVALS</Title>
                    </Col>
                </Row>
                <ProductSection />
                <Row className='mt-5 justify-content-center text-center'>
                    <Col>
                        <Button type="primary" color='default' shape="round" size='large' variant='solid' onClick={() => navigate("/collection/men")} >View More</Button>
                    </Col>
                </Row>
                <Divider style={{ borderColor: '#222' }} />
            </div >
        </>
    )
}

export default NewArrival
