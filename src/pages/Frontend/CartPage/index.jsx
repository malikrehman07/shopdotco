import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { useCartContext } from '../../../context/Cart';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';

const { Title } = Typography;

const CartPage = () => {
  const { cart, removeFromCart } = useCartContext();
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => {
    const price = item.selectedVariant?.specialPrice ??
      item.selectedVariant?.price ??
      item.price;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <main style={{ backgroundColor: "#ededed" }}>

      <div className="container py-4">
        <Row>
          <Col span={24}>
            <Title level={1}>Your Cart</Title>
          </Col>
          <Col lg={24}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product, i) => {
                    const price =
                      product.selectedVariant?.specialPrice ??
                      product.selectedVariant?.price ??
                      product.price;
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td><img src={product.image} alt={product.title} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: 8 }} /></td>
                        <td>{product.title}</td>
                        <td>${price} </td>
                        <td>{product.quantity || 1}</td>
                        <td><Button danger type='primary' onClick={() => { const id = user?.uid ? product._id : product.productId; removeFromCart(id) }} >Remove</Button></td>
                      </tr>
                    )
                  })

                  }
                </tbody>
              </table>
            </div>
          </Col>
          <Col align="end" className="mt-3" span={24}>
            <Title level={4}>Total: ${total.toFixed(2)}</Title>
          </Col>
          <Col align="end" span={24}>
            <Button type="primary" disabled={!cart.length} color='default' variant='solid' size='large' onClick={() => navigate("/checkout")} >
              Proceed to Checkout
            </Button>
          </Col>
        </Row>

      </div>
    </main>
  );
};

export default CartPage;
