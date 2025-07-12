import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../../../context/Auth'

const { Paragraph } = Typography

const Login = () => {
    const navigate = useNavigate()
    const { dispatch, readProfile } = useAuthContext()
    const [state, setState] = useState({ email: "", password: "" })
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        let { email, password } = state;

        if (!window.isEmail(email)) {
            return window.notify("Please Enter Your email Correctly", "error")
        }
        if (password.length < 8) {
            return window.notify("Password must be atleast of 8 characters", "error")
        }

        setIsProcessing(true)
        try {
            const res = await axios.post("https://shop-co-nbni.vercel.app/auth/login", {email,password})

            // ✅ Store token and update context
            localStorage.setItem("token", res.data.token)
            console.log("🔐 Token in localStorage:", localStorage.getItem("token"));

            // dispatch({ isAuth: true, user: res.data.user })
            await readProfile();

            window.notify("Logged in Successfully", "success")
            navigate("/customer/overview")
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong while logging in user"
            window.notify(msg, "error")
            console.error(error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <main className='auth p-3 p-md-4 p-lg-5'>
            <div className="container">
                <div className="card p-3 p-md-4">
                    <Form layout='vertical'>
                        <Row gutter={[6, 6]}>
                            <Col span={24}>
                                <Form.Item label="Email" required >
                                    <Input type='email' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Password" required >
                                    <Input.Password placeholder='Enter Your Password' name='password' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" color='default' variant='solid' block htmlType='submit' loading={isProcessing} onClick={handleSubmit} >Login</Button>
                            </Col>
                            <Col span={24} className='text-center' >
                                <Paragraph>Not have a account?<Link to="/auth/register" >Register</Link></Paragraph>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Login
