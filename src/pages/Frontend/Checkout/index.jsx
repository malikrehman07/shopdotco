import React, { useState } from 'react';
import { Typography, Input, Button, Divider, message, Row, Col, Form } from 'antd';
import { useAuthContext } from '../../../context/Auth';
import { useCartContext } from '../../../context/Cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const { Title } = Typography;
// const { VITE_STRIPE_PUBLISHABLE_KEY } = process.env
// const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

console.log(stripePromise)

const initialState = { fullName: "", email: "", address: "", city: "", postalCode: "", total: "", phoneNo: "" }

const CheckoutForm = () => {
    const { user } = useAuthContext();
    const { cart, clearCart } = useCartContext();
    const [state, setState] = useState(initialState);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState("standard")
    const [coupon, setCoupon] = useState("")
    const [isProcessing, setIsProcessing] = useState(false);
    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const createPaymentIntent = async (amount) => {
        try {
            const response = await axios.post("http://localhost:8000/create-payment-intent", {
                amount: Math.round(amount * 100) // Stripe takes amounts in cents
            });

            return response.data.clientSecret;
        } catch (error) {
            console.error("Failed to create payment intent", error);
            return null;
        }
    };


    const subtotal = cart.reduce((sum, item) => {
        const price = item.selectedVariant?.specialPrice || item.selectedVariant?.price || item.price;
        return sum + price * (item.quantity || 1);
    }, 0);

    const discount = coupon === 'SAVE10' ? 0.1 * subtotal : 0;
    const deliveryCost = delivery === 'express' ? 10 : 0;
    const total = subtotal - discount + deliveryCost;

    const handlePayment = async () => {

        let { fullName, email, address, city, postalCode, phoneNo } = state

        if (!user) {
            return message.warning('Please login to proceed with checkout');
        }

        const clientSecret = await createPaymentIntent(total);
        if (!clientSecret) {
            message.error("Failed to initiate payment.");
            setIsProcessing(false);
            return;
        }

        setIsProcessing(true);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: fullName,
                    email: email,
                },
            }
        });

        if (error) {
            message.error(error.message);
            setIsProcessing(false);
            return;
        }

        const order = { uid: user.uid, fullName, email, phoneNo, address, city, postalCode, delivery, coupon, status: "Processing", total: parseFloat(total.toFixed(2)), paymentIntentId: paymentIntent.id, cart }

        try {
            const res = await axios.post("http://localhost:8000/checkout", order);
            console.log("Order response:", res.data);
            setState(initialState);
            window.notify("Order created successfully ", "success");
        } catch (e) {
            window.notify("Error creating Order", "error");
            console.error("Order error:", e);
        } finally {
            setIsProcessing(false);
        }
        await clearCart();

        message.success('Order placed successfully!');
        navigate('/thank-you', { state: { total, delivery, cart, address } });
    };





    return (
        <main style={{ backgroundColor: "#ededed" }}>
            <div className="container py-5">

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <div className="card rounded-4">
                            <Form layout="vertical" className='m-4'>
                                <Title level={2} className='text-center' >Shipping Address</Title>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Full Name" required> <Input name="fullName" placeholder='Please Enter Your FullName' onChange={handleChange} /> </Form.Item>
                                        <Form.Item label="Email" required> <Input name="email" placeholder='Please Enter Your email' onChange={handleChange} /> </Form.Item>
                                        <Form.Item label="Phone Number" required> <Input name="phoneNo" placeholder='Please Enter Your Phone No' onChange={handleChange} /> </Form.Item>
                                        <Form.Item label="Address" required> <Input name="address" placeholder='Please Enter Your Address' onChange={handleChange} /> </Form.Item>
                                        <Form.Item label="City" required> <Input name="city" placeholder='Please Enter Your City' onChange={handleChange} /> </Form.Item>
                                        <Form.Item label="Postal Code" required> <Input name="postalCode" placeholder='Please Enter Your Postal Code' onChange={handleChange} /> </Form.Item>
                                        {/* <Button color='default' variant='solid' type='primary' size='large' block >Next</Button> */}
                                    </Col>
                                </Row>
                            </Form>
                            <Form layout='vertical' className='m-4'>
                                <Title level={4}>Payment Details</Title>
                                <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 4, marginBottom: 20 }}>
                                    <CardElement />
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <div className="card rounded-4 p-4">
                            <Title level={3} className='mb-3'>Order Summary</Title>

                            {cart.map((item, idx) => {
                                const price = item.selectedVariant?.specialPrice || item.selectedVariant?.price || item.price;
                                return (
                                    <div key={idx} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                                        <Row align="middle" justify="space-between">
                                            <Col span={16}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <img src={item.image} alt={item.title} style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: 8 }} />
                                                    <div>
                                                        <div style={{ fontWeight: 500 }}>{item.title}</div>
                                                        <div style={{ fontSize: 14 }}>Qty: {item.quantity || 1}</div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={8} style={{ textAlign: 'right' }}>
                                                ${Number(price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </div>

                                );
                            })}

                            <Divider />

                            <Row justify="space-between" className='mb-2'>
                                <Col>Subtotal</Col>
                                <Col>${subtotal.toFixed(2)}</Col>
                            </Row>

                            <Row justify="space-between" className='mb-2'>
                                <Col>Discount</Col>
                                <Col>- ${discount.toFixed(2)}</Col>
                            </Row>

                            <Row justify="space-between" className='mb-2'>
                                <Col>Delivery</Col>
                                <Col>${deliveryCost.toFixed(2)}</Col>
                            </Row>

                            <Divider />

                            <Row justify="space-between">
                                <Col><Title level={4}>Total</Title></Col>
                                <Col><Title level={4}>${total.toFixed(2)}</Title></Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Button color='default' variant='solid' type='primary' size='large' block onClick={handlePayment} loading={isProcessing}>Pay Now</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                </Row>
            </div>
        </main>
    );
};

const CheckoutPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default CheckoutPage;
