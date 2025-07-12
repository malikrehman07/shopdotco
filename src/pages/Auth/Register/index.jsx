import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../../../context/Auth'

const { Paragraph } = Typography

const Register = () => {
    const [state, setState] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword:"" ,role: "customer" })
    const [isProcessing, setIsProcessing] = useState(false)
    const { dispatch } = useAuthContext()

    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        let { firstName, lastName, email, password,confirmPassword, role } = state;

        firstName = firstName.trim()
        if (firstName.length < 3) {
            return window.notify("Please Enter Your First Name Correctly", "error")
        }
        lastName = lastName.trim()
        if (lastName.length < 3) {
            return window.notify("Please Enter Your Last Name Correctly", "error")
        }
        if (!window.isEmail(email)) {
            return window.notify("Please Enter a Valid Email", "error")
        }
        if (password.length < 8) {
            return window.notify("Password must be at least 8 characters", "error")
        }
        if (confirmPassword !== password) {
            return window.notify("Password must be at least 8 characters", "error")
        }

        // const fullName = `${firstName} ${lastName}`
        const userData = { firstName, lastName, email, password, role }

        setIsProcessing(true)

        try {
            const res = await axios.post("http://localhost:8000/auth/register", userData)
            const token = res.data.token;

            localStorage.setItem("token", token);

            // Automatically log in the user
            dispatch((s) => ({ ...s, isAuth: true, user: res.data.user }));

            window.notify(res.data.message || "Registered Successfully", "success")
            // navigate("/customer/overview")
        } catch (error) {
            console.error(error)
            const msg = error.response?.data?.message || "Registration failed"
            window.notify(msg, "error")
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
                            <Col xs={24} md={12}>
                                <Form.Item label="First Name" required>
                                    <Input type='text' placeholder='Enter Your First Name' name='firstName' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label="Last Name" required>
                                    <Input type='text' placeholder='Enter Your Last Name' name='lastName' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Email" required>
                                    <Input type='email' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            {/* Uncomment if you want role selection */}
                            {/* <Col span={24}>
                                <Form.Item label="Role" required>
                                    <Select name="role" value={state.role} onChange={(value) => setState((prev) => ({ ...prev, role: value }))}>
                                        <Select.Option value="customer">Customer</Select.Option>
                                        <Select.Option value="admin">Admin</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col> */}
                            <Col span={24}>
                                <Form.Item label="Password" required>
                                    <Input.Password placeholder='Enter Your Password' name='password' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Confirm Password" required>
                                    <Input.Password placeholder='Confirm Your Password' name='confirmPassword' onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" color='default' variant='solid' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </Col>
                            <Col span={24} className='text-center'>
                                <Paragraph>Already have an account? <Link to="/auth/login">Login</Link></Paragraph>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Register
