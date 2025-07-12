import React from 'react'
import { Card, Col, Divider, Image, Rate, Row, Typography } from 'antd'

const { Title, Paragraph } = Typography
const Ratings = () => {
    
  return (
    <>
      <div className="container py-5">
                <Row>
                    <Col span={24} className='text-center'>
                        <Title level={1}>Our Happy Customers</Title>
                    </Col>
                </Row>
                <Row gutter={[24, 24]} justify="center" className="mt-5">
                    {[
                        {
                            name: 'Alice K',
                            title: 'Fashion Blogger',
                            rating: 5,
                            image: 'https://randomuser.me/api/portraits/women/44.jpg',
                            review: 'Absolutely love the quality of the clothes! Will definitely shop again.'
                        },
                        {
                            name: 'King M',
                            title: 'Model & Influencer',
                            rating: 5,
                            image: 'https://randomuser.me/api/portraits/men/47.jpg',
                            review: 'Great fits, stylish, and arrived on time. Highly recommended!'
                        },
                        {
                            name: 'Jack R',
                            title: 'Stylist',
                            rating: 5,
                            image: 'https://randomuser.me/api/portraits/men/52.jpg',
                            review: 'I use these items for all my client shoots — love the detail and fabric.'
                        },
                        {
                            name: 'Janny S',
                            title: 'Fashion Enthusiast',
                            rating: 5,
                            image: 'https://randomuser.me/api/portraits/women/68.jpg',
                            review: 'Trendy collection and top-notch service. My go-to brand!'
                        }
                    ].map((review, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} key={index}>
                            <Card variant='borderless' className="rounded-lg shadow-md text-center">
                                <Image
                                    src={review.image}
                                    alt={review.name}
                                    width={80}
                                    height={80}
                                    preview={false}
                                    style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                                />
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
    </>
  )
}

export default Ratings
