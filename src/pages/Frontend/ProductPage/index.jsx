import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography, Spin, Row, Col, Flex, Rate, Button, Space, Card, Divider, Radio, Breadcrumb } from 'antd';
import { Carousel } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ProductSection from '../Home/ProductSection'
import NewsLetter from '../Home/NewsLetter'
import { useCartContext } from '../../../context/Cart';
import { useAuthContext } from '../../../context/Auth';
import axios from 'axios';


const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const { Title, Paragraph } = Typography;

const ProductPage = () => {
    const { category, id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [ratings, setRatings] = useState({});
    const [value, setValue] = useState(4.5);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { addToCart } = useCartContext();
    const { user } = useAuthContext();
    const navigate = useNavigate()

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));


    const handleAddToCart = () => {
        if (!selectedVariant) {
            return window.notify("Please select a size or variant", "error");
        }

        const cartItem = {
            productId: id,
            title: product.title,
            image: product.imageUrls?.[0],
            selectedVariant: selectedVariant,
            quantity: quantity,
            uid: user?.uid || null,
            addedAt: new Date().toISOString(),
        };

        addToCart(cartItem);
    };



    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://shop-co-nbni.vercel.app/products/read/${id}`);
                console.log("Fetched product:", res.data.product);
                setProduct(res.data.product);
            } catch (error) {
                window.notify("Error fetching products", "error");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    const handleSizeChange = (e) => {
        const size = e.target.value;
        const variant = product.variants.find(v => v.size === size);
        setSelectedVariant(variant);
    };

    if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} />;

    if (!product) return <Title level={3}>Product not found</Title>;

    return (
        <main>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Breadcrumb
                            items={[
                                {
                                    title: <Link to="/">Home</Link>,
                                },
                                {
                                    title: <Link to={`/collection/${category}`}>{category}</Link>,
                                },
                                {
                                    title: product.title,
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </div>
            <div className="container py-5">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Carousel autoplay dots={false}>
                            {product.imageUrls?.map((imgUrl, i) => (
                                <div key={i}>
                                    <img src={imgUrl} alt={`Product ${i + 1}`} className='img-fluid' />
                                </div>
                            ))}
                        </Carousel>
                    </Col>


                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Row>
                            <Col span={24}>
                                <Title level={2}>{product.title}</Title>
                                <p className='mb-1'><strong>SKU:</strong> {selectedVariant?.sku}</p>
                            </Col>
                        </Row>
                        <Row gutter={[8, 8]} className='mb-2'>
                            <Col span={24}>
                                <Flex gap="small" align='center'>
                                    <Rate tooltips={desc} onChange={setValue} value={value} style={{ fontSize: '18px' }} />
                                    <span style={{ fontSize: '14px' }}>{value}/5 ({ratings[product.id]?.count || 10} ratings)</span>
                                </Flex>
                            </Col>
                        </Row>
                        <Row gutter={[8, 8]} >
                            <Col span={24}>
                                <Title level={4}>Product Details</Title>
                                <pre className='mb-1' style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                    <Paragraph className='mb-1' >{product.description}</Paragraph>
                                </pre>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} className='mb-2'>
                            <Col span={24}>
                                <strong>Size: </strong>
                                <Radio.Group onChange={handleSizeChange} value={selectedVariant?.size}>
                                    {product.variants.map((variant, i) => (
                                        <Radio.Button key={i} value={variant.size}>
                                            {variant.size}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col span={24}>
                                <p className='mb-1'><strong>Stock:</strong> {selectedVariant?.items}</p>
                                {/* <Title level={3} className='mb-1' >{selectedVariant?.price ? <>${selectedVariant?.specialPrice} <strike style={{ color: "#c9c6c5" }}>${selectedVariant?.price}</strike></> : <>${product.variants?.specialPrice}</>}</Title> */}
                                <Title level={3} className='mb-1' >{selectedVariant ? (selectedVariant.specialPrice ? (<>${selectedVariant.specialPrice}{' '} <strike style={{ color: '#c9c6c5' }}>${selectedVariant.price}</strike></>) : (<>${selectedVariant.price}</>)) : (<>${product.variants?.[0]?.price}</>)}</Title>
                            </Col>
                        </Row>
                        <Row gutter={[8, 8]} justify="center">
                            <Col xs={8} sm={8} lg={6}>
                                <Space>
                                    <div style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '50px' }} >
                                        <Button icon={<MinusOutlined />} onClick={decrement} shape="circle" size="large" style={{ border: 'none', background: 'transparent' }} />
                                        <span style={{ margin: '0 12px', fontWeight: 500 }}>{quantity}</span>
                                        <Button icon={<PlusOutlined />} onClick={increment} shape="circle" size="large" style={{ border: 'none', background: 'transparent' }} />
                                    </div>
                                </Space>
                            </Col>
                            <Col xs={16} sm={16} lg={18}>
                                <Button color="default" variant="filled" size='large' shape='round' style={{ border: '1px solid #222' }} block onClick={handleAddToCart} >Add to Cart</Button>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col span={24}>
                                <Button type="primary" color='default' variant='solid' size='large' shape='round' onClick={() => navigate("/checkout")} block >Buy Now</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </div >
            <div className="container">
                <Row>
                    <Col span={12} className='text-center'>
                        <Title level={5}><a href="#product-details" style={{ color: "#222" }}>Product Details</a></Title>
                        <Divider style={{ borderColor: '#222' }} />
                    </Col>
                    <Col span={12} className='text-center'>
                        <Title level={5}><a href="#ratings&reviews" style={{ color: "#222" }}>Ratings & Reviews</a></Title>
                        <Divider style={{ borderColor: '#222' }} />
                    </Col>
                </Row>
                <Row gutter={[8, 8]} className='py-5' id='product-details' >
                    <Col span={24}>
                        <Title level={2}>Product Details</Title>
                        <pre className='mb-1' style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            <Paragraph className='mb-1' >{product.description}</Paragraph>
                        </pre>
                    </Col>
                </Row>
                <Divider style={{ borderColor: '#222' }} />
                <Row id='ratings&reviews' className='mt-5' >
                    <Col span={24}>
                        <Title level={2}>All Reviews</Title>
                    </Col>
                </Row>
                <Row gutter={[24, 24]} justify="center">
                    {[
                        {
                            name: 'Alice K',
                            title: 'Fashion Blogger',
                            rating: 5,
                            review: 'Absolutely love the quality of the clothes! Will definitely shop again.'
                        },
                        {
                            name: 'King M',
                            title: 'Model & Influencer',
                            rating: 5,
                            review: 'Great fits, stylish, and arrived on time. Highly recommended!'
                        },
                        {
                            name: 'Jack R',
                            title: 'Stylist',
                            rating: 5,
                            review: 'I use these items for all my client shoots — love the detail and fabric.'
                        },
                        {
                            name: 'Janny S',
                            title: 'Fashion Enthusiast',
                            rating: 5,
                            review: 'Trendy collection and top-notch service. My go-to brand!'
                        },
                    ].map((review, index) => (
                        <Col xs={24} sm={12} md={12} lg={12} key={index}>
                            <Card className="rounded-lg shadow-md text-start">
                                <Title level={5} className="mb-1">{review.name}</Title>
                                <Paragraph type="secondary" className="mb-2">{review.title}</Paragraph>
                                <Rate disabled defaultValue={review.rating} />
                                <Paragraph className="mt-2" style={{ fontSize: '14px' }}>{review.review}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Divider style={{ borderColor: '#222' }} />
            </div>
            <div className="container py-2 mb-5">
                <Row gutter={[16, 16]} >
                    <Col span={24} className='text-center'>
                        <Title level={1}>YOU MIGHT ALSO LIKE</Title>
                    </Col>
                </Row>
                <ProductSection />
            </div>

            <NewsLetter />
        </main>
    );
};

export default ProductPage;
