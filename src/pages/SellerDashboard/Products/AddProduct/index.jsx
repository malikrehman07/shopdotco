import React, { useState } from 'react';
import { Typography, Input, Button, Card, Form, Select, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../../../context/Auth';
import { supabase } from '../../../../config/supabase';
import axios from 'axios';
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const initialState = { title: "", description: "", category: "" }
const initialVariants = { sku: '', items: '', price: '', size: '' }
const ProductPage = () => {
  const { user } = useAuthContext()
  const [fileList, setFileList] = useState([])
  const [state, setState] = useState(initialState)
  const [isProccessing, setIsProccessing] = useState(false)
  const [variants, setVariants] = useState([initialVariants]);

  const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  // const handleVariantChange = (index, field, value) => {
  //   const updatedVariants = [...variants];
  //   updatedVariants[index][field] = value;
  //   setVariants(updatedVariants);
  // };
  const handleVariantChange = (index, field, value) => {
    setVariants(prevVariants => {
      const updated = [...prevVariants];
      updated[index] = { ...updated[index], [field]: value }; // create a new object
      return updated;
    });
  };

  const handleAddVariant = () => {
    setVariants([...variants, { sku: "", items: "", price: "", size: "", specialPrice: "" }]);
  };

  const handleRemoveVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { title, description, category } = state;

    title = title.trim();
    if (title.length < 3) { return window.notify("Please Enter the Product Title", "error") }


    description = description.trim();
    if (description.length > 1000 || description == "") { return window.notify("Description must be provided and no more than 1000 characters", "error"); }


    if (category == "") { return window.notify("Please Select the Category", "error") }


    if (fileList.length === 0 || fileList.length > 5) { return window.notify("Please upload between 1 and 5 images", "error") }

    for (let i = 0; i < variants.length; i++) {
      let { sku, price, size, items } = variants[i];

      if (!sku) return window.notify(`Please enter SKU for variant #${i + 1}`, "error");
      if (!price) return window.notify(`Please enter Price for variant #${i + 1}`, "error");
      if (!size) return window.notify(`Please enter Size for variant #${i + 1}`, "error");
      if (items === "" || isNaN(items) || parseInt(items) < 1) {
        return window.notify(`Please enter valid number of Items for variant #${i + 1}`, "error");
      }
    }

    setIsProccessing(true)
    const productId = getRandomId();
    const imageUrls = [];

    for (let fileObj of fileList) {
      const file = fileObj.originFileObj;
      const url = await handleUploadFile(file, productId); // use Date.now() as product ID base
      if (url) imageUrls.push(url);
    }

    if (imageUrls.length === 0) {
      return window.notify("Image upload failed", "error");
    }

    const token = localStorage.getItem("token");

    const product = {productId, title, description, category, imageUrls, variants };

    try {
      const res = await axios.post("http://localhost:8000/products/add", product, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Must be "Bearer <token>"
        }
      });
      window.notify("Product added successfully!", "success");
      setState(initialState);
      setVariants([initialVariants]);
      setFileList([]);
    } catch (error) {
      console.error("Add Product Error:", error); // Log full error
      const msg = error?.response?.data?.message || "Failed to add product";
      window.notify(msg, "error");
    } finally {
      setIsProccessing(false);
    }

  }
  const handleUploadFile = async (file, productId) => {
    // const id = getRandomId()
    const fileExt = file.name.split('.').pop();
    const filePath = `products/${productId}/${Date.now()}.${fileExt}`; // removed extra spaces

    const { data, error } = await supabase.storage.from('product').upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from('product').getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  };

  return (
    <div className="">
      <Title level={3}>Add New Product</Title>
      <Card bordered={false} className="mt-3">
        <Form layout="vertical">
          <Form.Item label="Product Name" required >
            <Input type='text' name="title" placeholder="e.g. Red Tape Sports Shoes" value={state.title} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Description" required>
            <TextArea name="description" rows={4} placeholder="Product description here..." value={state.description} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Category" required >
            <Select name="category" placeholder="Select category" onChange={(value) => setState(s => ({ ...s, category: value }))} value={state.category} >
              <Option value="men">men</Option>
              <Option value="women">women</Option>
            </Select>
          </Form.Item>


          {variants.map((variant, index) => (
            <Row gutter={24} key={index} align="middle" className='mb-3'>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Item label="SKU" required>
                  <Input placeholder="e.g. 0MSTKR25V519-SML-RGL" value={variant.sku} onChange={(e) => handleVariantChange(index, 'sku', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <Form.Item label="No. of Items" required>
                  <Input type="number" placeholder="e.g. 50" value={variant.items} onChange={(e) => handleVariantChange(index, 'items', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <Form.Item label="Price ($)" required>
                  <Input type="number" placeholder="Enter price" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <Form.Item label="Special Price ($)">
                  <Input type="number" placeholder="Enter special price" value={variant.specialPrice} onChange={(e) => handleVariantChange(index, 'specialPrice', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <Form.Item label="Size" required>
                  <Input placeholder="e.g. S" value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={2} lg={2}>
                <Button danger onClick={() => handleRemoveVariant(index)} disabled={variants.length === 1}>Remove</Button>
              </Col>
            </Row>
          ))}
          <Button type="dashed" onClick={handleAddVariant} block icon="+" className='mb-4'>Add More</Button>


          <Form.Item name="images" label="Upload Images" required >
            <Upload name="image" listType="picture" beforeUpload={() => false} multiple fileList={fileList} onChange={({ fileList = [] }) => setFileList([...fileList])} maxCount={5}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" color='default' variant='solid' htmlType="submit" loading={isProccessing} onClick={handleSubmit}>Add Product</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


export default ProductPage;
