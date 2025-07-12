import React from 'react';
import { Row, Col, Typography, Divider, Card } from 'antd';

const { Title, Paragraph } = Typography
const About = () => {
    return (
        <main>
            <div className="container py-5">
                <Row gutter={[24, 24]} className="align-items-center">
                    <Col xs={24} md={12}>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/023/649/106/non_2x/about-us-button-web-banner-templates-illustration-free-vector.jpg"
                            alt="About Us"
                            className="img-fluid rounded-4 shadow"
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={2}>About Us</Title>
                        <Paragraph>
                            Welcome to our store! We’re dedicated to offering you the best of fashion with a focus on quality, customer service, and uniqueness.
                        </Paragraph>
                        <Paragraph>
                            Our journey started in 2020, and since then we’ve helped thousands of customers find the right outfit for every occasion.
                        </Paragraph>
                    </Col>
                </Row>

                <Divider className="my-5" />

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Card className="text-center shadow-sm">
                            <Title level={4}>Our Mission</Title>
                            <Paragraph>To provide premium clothing at affordable prices with fast shipping and excellent customer support.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="text-center shadow-sm">
                            <Title level={4}>Our Vision</Title>
                            <Paragraph>To become a go-to brand for everyday wear and trendsetting styles globally.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="text-center shadow-sm">
                            <Title level={4}>Our Values</Title>
                            <Paragraph>Customer satisfaction, quality, innovation, and sustainability.</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default About
