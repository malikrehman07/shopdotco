import React from 'react'
import { Button, Col, Row, Typography, Form, Input } from 'antd'
import { useState } from 'react'
import axios from "axios"

const { Title } = Typography
const NewsLetter = () => {
    const [state, setState] = useState({ email: "" })
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubscribe = async () => {
        const { email } = state;
        if (!window.isEmail(email)) { return window.notify("Please Enter Your Email", "error") }
        try {
            setLoading(true);
            const res = await axios.post("https://shopdotco.vercel.app/newsletter/subscribe", { email });

            if (res.data?.success) {
                window.notify("Subscribed successfully! 🎉", 'success');
            } else {
                window.notify(res.data?.message || "Subscription failed", 'error');
            }
        } catch (error) {
            window.notify(error.response?.data?.message || "Something went wrong!", 'error');
        } finally {
            setLoading(false);
        }
    };
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
                            type="email" name='email' placeholder="Please Enter Your Email" className="form-control rounded-5" value={state.email} onChange={handleChange} />
                        <Button
                            type="primary" color='default' variant='outlined' block shape="round" size="large" loading={loading} className="mt-3" onClick={handleSubscribe} >Subscribe to our NewsLetter</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default NewsLetter
