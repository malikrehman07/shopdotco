import { Button, Col, Flex, Rate, Row, Spin, Typography } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import NewsLetter from '../../Home/NewsLetter';
import { useCartContext } from '../../../../context/Cart';
import axios from 'axios';


const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


const { Title } = Typography
const MenCollection = () => {
  const [products, setProducts] = useState([])
  const [value, setValue] = useState(4.5);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { handleAddToCart } = useCartContext()

  const handleRateChange = (value, id) => {
    setRatings(prev => ({ ...prev, [id]: value }));
  };
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://shop-co-nbni.vercel.app/collections/women`);
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
                  title: "Women Collection",
                },
              ]}
            />
          </Col>
        </Row>
      </div>
      <div className="container py-5">
        <Row>
          <Col span={24}>
            <Title level={1} className='text-center'>Women's Collection</Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center" className="mt-2 text-start">
          {products.map((product) => {
            return (
              <Col xs={12} sm={12} md={12} lg={6} key={product.id}>
                <div className="card border-0" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/collection/${product.category}/product/${product._id}`)} >
                    <img src={product.imageUrls?.[0]} alt={product.alt} className="img-fluid rounded-4" />
                    <Title level={5} className='mt-2'>{product.title}</Title>
                  </div>
                  <div className="mb-1">
                    <Flex gap="small" align='center'>
                      <Rate tooltips={desc} onChange={(val) => handleRateChange(val, product.id)} value={ratings[product.id] || 0} style={{ fontSize: '14px' }} />
                      <span style={{ fontSize: '14px' }}>{ratings[product.id] || 0}/5 ({ratings[product.id]?.count || 10})</span>
                    </Flex>
                  </div>
                  <div>
                    <Title level={4} className='mb-2'>{product.variants?.[0]?.specialPrice ? <>${product.variants?.[0]?.specialPrice} <strike style={{ color: "#c9c6c5" }}>${product.variants?.[0]?.price}</strike></> : <>${product.variants?.[0]?.price}</>}</Title>
                    <Button type="primary" color='default' shape="round" size='large' variant='solid' block loading={loading} onClick={() => handleAddToCart(product)} >Add To Cart</Button>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
        {/* <Row className='mt-5'>
          <Col span={24}>
            <Pagination align='center' defaultCurrent={1} total={50} />
          </Col>
        </Row> */}
      </div>
      <NewsLetter />
    </main>
  )
}

export default MenCollection
