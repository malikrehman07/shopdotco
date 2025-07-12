import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const ThankYouPage = () => {
  const { state } = useLocation();

  return (
    <div className="container py-5 text-center">
      <Title level={2}>Thank You!</Title>
      <Paragraph>Your order has been placed successfully.</Paragraph>

      <Card title="Order Summary" bordered={false} >
        <p><strong>Total Paid:</strong> ${state?.total?.toFixed(2)}</p>
        <p><strong>Delivery Type:</strong> {state?.delivery}</p>
        <Title level={5}>Items:</Title>
        {state?.cart?.map((item, idx) => (
          <p key={idx}>{item.title} - {item.selectedVariant?.size} - Qty: {item.quantity}</p>
        ))}
      </Card>
    </div>
  );
};

export default ThankYouPage;
