import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, Typography } from 'antd'
import { useAuthContext } from '../../../context/Auth'
import axios from 'axios'

const { Title } = Typography
const Customer = () => {
    const { user } = useAuthContext()
    // const [customers, setCustomers] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get('https://shop-co-nbni.vercel.app/dashboard/order', {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Must be "Bearer <token>"
                    }
                })
                setOrders(res.data.orders)
            } catch (err) {
                console.error("Error fetching orders:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])
    if (loading) return <Spin size='Large' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} />
    return (
        <div className="dashboard-content">
            <Row>
                <Col span={24}>
                    <Title level={2} className='text-center'>Customers</Title>
                </Col>
                <Col span={24}>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Postal Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{order.fullName}</td>
                                            <td>{order.email}</td>
                                            <td>{order.phoneNo}</td>
                                            <td>{order.address}</td>
                                            <td>{order.city}</td>
                                            <td>{order.postalCode}</td>
                                            {/* <td>
                                                <Space>
                                                    <Button type='primary' danger size='small' loading={isProcessing} onClick={() => { handleDelete(customer) }} >Delete</Button>
                                                </Space>
                                            </td> */}
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Customer
