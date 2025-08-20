import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Flex, Rate, Row, Spin, Typography } from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useCartContext } from '../../../../context/Cart';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const { Title } = Typography
const ProductSection = () => {
    const [products, setProducts] = useState([])
    const [value, setValue] = useState(4.5);
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(true)
    const { handleAddToCart } = useCartContext()

    const handleRateChange = (value, id) => {
        setRatings(prev => ({ ...prev, [id]: value }));
    };


    const navigate = useNavigate();
    const getProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://shop-co-nbni.vercel.app/products/read");
            setProducts(res.data.products);
        } catch (error) {
            window.notify("Error fetching products", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { getProducts() }, [getProducts])
    if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} />;
    return (
        <>
            <Row gutter={[16, 16]} justify="center" className=" text-start">
                {products.slice(0, 4).map((product) => {
                    return (
                        <Col xs={12} sm={12} md={12} lg={6} key={product.id}>
                            <div className="card border-0" style={{ width:"100%", height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/collection/${product.category}/product/${product._id}`)} >
                                    <img src={product.imageUrls?.[0]} alt={product.alt} style={{ width: "400px", height:"300px", objectFit: "cover" }} className="img-fluid rounded-4" />
                                    <Title level={5} className='mt-2' style={{height:"40px"}}  >{product.title}</Title>
                                </div>
                                <div className="mb-1">
                                    <Flex gap="small" align='center'>
                                        <Rate tooltips={desc} onChange={setValue} value={value} style={{ fontSize: '14px' }} />
                                        <span style={{ fontSize: '14px' }}>{value}/5 ({ratings[product.id]?.count || 10})</span>
                                    </Flex>
                                </div>
                                <div>
                                    <Title level={4} className='mb-2'>{product.variants?.[0]?.specialPrice ? <>${product.variants?.[0]?.specialPrice} <strike style={{ color: "#c9c6c5" }}>${product.variants?.[0]?.price}</strike></> : <>${product.variants?.[0]?.price}</>}</Title>
                                    <Button type="primary" color='default' shape="round" size='large' variant='solid' block onClick={() => handleAddToCart(product)}>Add To Cart</Button>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            
        </>
    )
}

export default ProductSection
