import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row, Spin, Typography } from 'antd'
import { useAuthContext } from '../../../context/Auth'
import axios from 'axios'

const { Title } = Typography
const Order = () => {
    const { user } = useAuthContext()
    const [orders, setOrders] = useState([])
    // const [isProcessing, setIsProcessing] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchOrders = useCallback(async () => {
        const token = localStorage.getItem("token")
    try {
      const res = await axios.get("https://shop-co-nbni.vercel.app/dashboard/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
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
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th className='text-center'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody >
                                {orders.map((order, i) => {
                                    const isCartArray = Array.isArray(order.cart);
                                    const cartItems = isCartArray ? order.cart : [order.cart];

                                    return (
                                        <React.Fragment key={i}>
                                            {cartItems.map((product, index) => (
                                                <tr key={index} style={{verticalAlign: 'middle' }}>
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
                                                    <td>{order.status}</td>
                                                    <td>{product.selectedVariant?.price ? `$${product.selectedVariant.price}` : "N/A"}</td>
                                                    <td className='text-center' >{product.quantity}</td>
                                                </tr>
                                            ))}
                                            {/* ✅ Total Row aligned under "Actions" */}
                                            <tr>
                                                <td colSpan={4}></td>
                                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: ${order.total}</td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Order
