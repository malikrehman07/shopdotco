import { Button, Col, Space, Row, Typography, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../context/Auth'
import { supabase } from '../../../../config/supabase'
import axios from 'axios'
const { Title } = Typography
const AllProducts = () => {
    const { user } = useAuthContext()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const handleDelete = async (product) => {
        const token = localStorage.getItem("token");
        if (!token) return window.notify("Unauthorized", "error");

        try {
            const { imageUrls = [] } = product;

            // Optional: delete images from Supabase if you're still using it
            for (let url of imageUrls) {
                const path = new URL(url).pathname.split("/storage/v1/object/public/product/")[1];
                if (path) {
                    await supabase.storage.from("product").remove([path]);
                }
            }

            await axios.delete(`https://shop-co-nbni.vercel.app/products/delete/${product._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            window.notify("Product deleted successfully", "success");
            // setProducts(products);
            setProducts(prev => prev.filter(p => p._id !== product._id));

        } catch (err) {
            console.error(err);
            window.notify("Failed to delete product", "error");
        }
    };

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
    if (loading) return <Spin size='Large' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} />
    return (
        <>
            <div className="dashboard-content">
                <Row>
                    <Col span={24}>
                        <Title level={2} className='text-center'>Products</Title>
                    </Col>
                    <Col span={24}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Images</th>
                                        <th>Title</th>
                                        <th>SKU</th>
                                        <th>Stock</th>
                                        <th>Category</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => {
                                        return (
                                            <tr key={i}>
                                                <th>{i + 1}</th>
                                                <td><img src={product.imageUrls?.[0]} alt={product.title} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: 8 }} /></td>
                                                <td>{product.title}</td>
                                                <td>{product.variants?.[0]?.sku}</td>
                                                <td>{product.variants?.[0]?.items}</td>
                                                <td>{product.category}</td>
                                                <td>{product.variants?.[0]?.size}</td>
                                                <td>{product.variants?.[0]?.specialPrice ? <>${product.variants?.[0]?.specialPrice}</> : <>${product.variants?.[0]?.price}</>} </td>
                                                <td>
                                                    <Space>
                                                        <Button type='primary' color='default' variant='solid' size='small' onClick={() => navigate(`/dashboard/product/edit/${product._id}`)} >Edit</Button>
                                                        <Button type='primary' color='default' variant='solid' danger size='small' onClick={() => { handleDelete(product) }} >Delete</Button>
                                                    </Space>
                                                </td>
                                            </tr>
                                        )
                                    })

                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                    <Col span={24} className='text-center'>
                        <Button type='primary' size='large' color='default' variant='solid' onClick={() => { navigate("/dashboard/product/add") }} >Add Product</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AllProducts
