import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, Select, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../../../../config/supabase';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [variants, setVariants] = useState([]);

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/products/read/${id}`);
            const data = res.data.product;
            form.setFieldsValue(data);
            setVariants(data.variants || []);

            if (data.imageUrls?.length) {
                const previewList = data.imageUrls.map((url, index) => ({
                    uid: `${index}`,
                    name: `image-${index + 1}`,
                    status: 'done',
                    url,
                }));
                setFileList(previewList);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            window.notify("Failed to fetch product", "error");
            navigate("/dashboard/product/all");
        }
    };

    const handleRemoveVariant = (index) => {
        const updated = [...variants];
        updated.splice(index, 1);
        setVariants(updated);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { sku: "", items: "", price: "", size: "", specialPrice: "" }]);
    };

    const handleRemove = async (file) => {
        try {
            const url = file.url || file.response?.url;
            if (!url) return;

            const path = new URL(url).pathname.split("/storage/v1/object/public/product/")[1];

            if (path) {
                const { error } = await supabase.storage.from("product").remove([path]);
                if (error) {
                    console.error("Failed to delete from Supabase:", error.message);
                    window.notify("Failed to delete image", "error");
                } else {
                    window.notify("Image removed from Supabase", "success");
                }
            }
        } catch (err) {
            console.error("Remove error:", err);
        }
    };


    
    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            setIsProcessing(true);

            let imageUrls = [];

            for (let fileObj of fileList) {
                const file = fileObj.originFileObj;

                if (!file) {
                    if (fileObj.url) imageUrls.push(fileObj.url);
                    continue;
                }
                const fileExt = file.name?.split('.').pop();
                const filePath = `products/${id}/${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('product')
                    .upload(filePath, file);

                if (uploadError) {
                    console.warn("Upload error:", uploadError);
                    continue;
                }

                const { data: publicUrlData } = supabase.storage
                    .from("product")
                    .getPublicUrl(filePath);
                imageUrls.push(publicUrlData?.publicUrl);
            }

            const token = localStorage.getItem("token");

            await axios.put(`http://localhost:8000/products/update/${id}`, {
                ...values,
                imageUrls,
                variants,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            window.notify("Product updated successfully!", "success");
            navigate("/dashboard/product/all");
        } catch (err) {
            if (err.response) {
                console.error("Server error:", err.response.data);
                window.notify(err.response.data.message || "Server Error", "error");
            } else {
                console.error("Client error:", err.message);
                window.notify("Network or client error", "error");
            }

        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <div className="dashboard-content">
            <Title level={3}>Edit Product</Title>
            <Form layout="vertical" form={form}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter product title' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter product description' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
                    <Select>
                        <Option value="men">men</Option>
                        <Option value="women">women</Option>
                    </Select>
                </Form.Item>

                {variants.map((variant, index) => (
                    <Row gutter={24} key={index} align="middle" className='mb-3'>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <Form.Item label="SKU" required>
                                <Input value={variant.sku} onChange={(e) => handleVariantChange(index, 'sku', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <Form.Item label="No. of Items" required>
                                <Input value={variant.items} onChange={(e) => handleVariantChange(index, 'items', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <Form.Item label="Price ($)" required>
                                <Input value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <Form.Item label="Special Price ($)">
                                <Input value={variant.specialPrice} onChange={(e) => handleVariantChange(index, 'specialPrice', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <Form.Item label="Size" required>
                                <Input value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={2} lg={2}>
                            <Button danger onClick={() => handleRemoveVariant(index)} disabled={variants.length === 1}>Remove</Button>
                        </Col>
                    </Row>
                ))}
                <Button type="dashed" onClick={handleAddVariant} block icon="+" className='mb-4'>Add More</Button>


                {/* <Form.Item label="Current Images">
                    {fileList.map(file => (
                        <img key={file.uid} src={file.url} alt="Product" style={{ width: 100, marginRight: 8 }} />
                    ))}
                </Form.Item> */}

                <Form.Item label="Upload New Images (optional)">
                    <Upload beforeUpload={() => false} listType="picture" fileList={fileList} onChange={({ fileList }) => setFileList([...fileList])} onRemove={handleRemove} maxCount={5}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleUpdate} htmlType='submit' color='default' variant='solid' loading={isProcessing}>
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProduct;
