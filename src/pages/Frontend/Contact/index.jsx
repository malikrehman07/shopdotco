import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';
import axios from "axios"

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const Contact = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post("https://shop-co-nbni.vercel.app/contact", values);
            window.notify("Message sent successfully!", "success");
        } catch (err) {
            console.error(err);
            window.notify("Failed to send message", "error");
        } finally {
            setLoading(false);
            form.resetFields();
        }
    };
    return (
        <main>
            <div className="container py-5">
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Title level={2}>Contact Us</Title>
                        <Paragraph>Feel free to reach out to us using the form. We usually respond within 24 hours.</Paragraph>

                        <Form layout="vertical" form={form} onFinish={onFinish}>
                            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                                <Input placeholder="Your Name" />
                            </Form.Item>

                            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
                                <Input placeholder="your@email.com" />
                            </Form.Item>

                            <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
                                <TextArea rows={4} placeholder="Write your message here..." />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" variant='solid' color='default' htmlType="submit" block>
                                    Send Message
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col xs={24} md={12}>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/008/559/114/non_2x/contact-us-button-contact-us-text-web-template-sign-icon-banner-vector.jpg"
                            alt="Contact"
                            className="img-fluid rounded-4 shadow"
                        />
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default Contact
