import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Typography, message, Form, Input, Spin } from 'antd';
import axios from 'axios';
import { useAuthContext } from '../../../context/Auth';

const { Title, Paragraph } = Typography;

const Address = () => {
  const { user } = useAuthContext();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const fetchAddresses = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get('https://shop-co-nbni.vercel.app/dashboard/address', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(res.data.addresses || []);
    } catch (err) {
      message.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://shop-co-nbni.vercel.app/dashboard/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success("Address deleted");
      fetchAddresses();
    } catch {
      message.error("Error deleting address");
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    form.setFieldsValue(address);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      if (editingAddress) {
        await axios.put(`https://shop-co-nbni.vercel.app/dashboard/address/${editingAddress._id}`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success("Address updated");
      } else {
        await axios.post('https://shop-co-nbni.vercel.app/dashboard/address', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success("Address added");
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch {
      message.error("Failed to save address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (loading) return <Spin size='Large' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} />

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Manage Address</Title>
        </Col>
      </Row>

      {addresses.length === 0 ? (
        <Button type="primary" onClick={handleAdd}>Add Address</Button>
      ) : (
        <Row gutter={[16, 16]}>
          {addresses.map((address) => (
            <Col span={24} md={12} lg={8} key={address._id}>
              <Card title="Shipping Address" bordered>
                <Paragraph>{address.fullName}</Paragraph>
                <Paragraph>{address.street}, {address.city}</Paragraph>
                <Paragraph>{address.zipCode}, {address.country}</Paragraph>
                <Button color='default' variant='solid' onClick={() => handleEdit(address)} className='me-2'>Edit</Button>
                <Button danger onClick={() => handleDelete(address._id)}>Delete</Button>
              </Card>
            </Col>
          ))}
          <Col span={24} className='text-center'>
            <Button type="dashed" color='default' variant='solid' onClick={handleAdd}>+ Add New Address</Button>
          </Col>
        </Row>
      )}

      <Modal
        title={editingAddress ? "Edit Address" : "Add Address"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="street" label="Street Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="zipCode" label="ZIP Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Address;
