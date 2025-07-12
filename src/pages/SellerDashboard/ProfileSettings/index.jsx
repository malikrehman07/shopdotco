// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Spin, Typography, message, Modal } from 'antd';
// import axios from 'axios';
// import { useAuthContext } from '../../../context/Auth'; // make sure the context is shared

// const { Title } = Typography;

// const ProfileSettings = () => {
//   const { user, logoutUser } = useAuthContext();
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   const fetchSellerProfile = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.get("https://shop-co-nbni.vercel.app/dashboard/read-profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProfile(res.data.user);
//       form.setFieldsValue(res.data.user);
//     } catch (err) {
//       message.error("Failed to load profile");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (values) => {
//     const token = localStorage.getItem("token");
//     setUpdating(true);
//     try {
//       const res = await axios.put("https://shop-co-nbni.vercel.app/dashboard/update-profile", values, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProfile(res.data.user);
//       message.success("Profile updated successfully");
//     } catch (err) {
//       message.error("Failed to update profile");
//       console.error(err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleDelete = async () => {
//     Modal.confirm({
//       title: "Are you sure you want to delete your seller account?",
//       content: "This action cannot be undone!",
//       okText: "Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       onOk: async () => {
//         const token = localStorage.getItem("token");
//         try {
//           await axios.delete("https://shop-co-nbni.vercel.app/dashboard/delete-profile", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           message.success("Account deleted");
//           logoutUser();
//         } catch (err) {
//           message.error("Error deleting account");
//           console.error(err);
//         }
//       },
//     });
//   };

//   useEffect(() => {
//     fetchSellerProfile();
//   }, []);

//   if (loading) return <Spin size='Large' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} />

//   return (
//     <div className="dashboard-content">
//       <Title level={2} className="text-center">Seller Profile Settings</Title>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleUpdate}
//         initialValues={profile}
//         className="mt-4"
//       >
//         <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
//           <Input placeholder="Your Full Name" />
//         </Form.Item>
//         <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
//           <Input disabled />
//         </Form.Item>
//         <Form.Item label="Phone" name="phone">
//           <Input placeholder="Phone Number" />
//         </Form.Item>
//         <Form.Item label="Bio" name="bio">
//           <Input.TextArea rows={3} placeholder="About your store or business..." />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" color='default' variant='solid' htmlType="submit" loading={updating}>
//             Update Profile
//           </Button>
//           <Button danger className="mx-2" onClick={handleDelete}>
//             Delete Account
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default ProfileSettings;
