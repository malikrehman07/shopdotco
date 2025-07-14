import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Row, Space, Spin, Typography } from 'antd'
import { useAuthContext } from '../../../context/Auth'
import axios from 'axios'

const { Title } = Typography
const Order = () => {
    const { user } = useAuthContext()
    const [orders, setOrders] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [loading, setLoading] = useState(true)


    const handleUpdate = async (order) => {
        const token = localStorage.getItem("token");
        const updatedData = { status: "Shipped" };

        try {
            await axios.put(`https://shop-co-nbni.vercel.app/dashboard/update/${order._id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}` // Only if your API requires token
                }
            });
            window.notify("Order Updated Successfully", "success");
            // Optionally refetch orders here
        } catch (error) {
            console.error("Update Error:", error);
            window.notify("Error Updating Order", "error");
        }
    };

    const handleDelete = async (order) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`https://shop-co-nbni.vercel.app/dashboard/delete/${order._id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Only if protected
                }
            });
            setOrders(prev => prev.filter(o => o._id !== order._id));
            window.notify("Order Deleted Successfully", "success");
            // Optionally remove from local list or refetch
        } catch (error) {
            console.error("Delete Error:", error);
            window.notify("Error Deleting the Order", "error");
        }
    };

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
                    <Title level={2} className='text-center'>Orders</Title>
                </Col>
                <Col span={24}>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Update Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => {
                                    const isCartArray = Array.isArray(order.cart);
                                    const cartItems = isCartArray ? order.cart : [order.cart];
                                    return (
                                        <React.Fragment key={i}>
                                            {cartItems.map((product, index) => (
                                                <tr key={index} style={{ textAlign: 'center' }}>
                                                    <td>{order._id}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                            <img
                                                                src={product.image}
                                                                alt={product.title}
                                                                style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: 8 }}
                                                            />
                                                            <span>{product.title}</span>
                                                        </div>
                                                    </td>
                                                    <td>{product.selectedVariant?.price}</td>
                                                    {/* <td>{order.createdAt.toDate().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,}).replace(',', '')}</td> */}
                                                    {/* <td>{order.createdAt}</td> */}
                                                    <td>
                                                        {new Date(order.createdAt).toLocaleString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: false,
                                                        }).replace(',', '')}
                                                    </td>
                                                    <td>{order.status}</td>
                                                    <td>
                                                        <Space>
                                                            <Button type='primary' size='small' loading={isProcessing} onClick={() => { handleUpdate(order) }} >Edit</Button>
                                                            <Button type='primary' danger size='small' loading={isProcessing} onClick={() => { handleDelete(order) }} >Delete</Button>
                                                        </Space>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )
                                })

                                }
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default Order
