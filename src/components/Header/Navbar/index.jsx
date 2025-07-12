import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../../context/Auth';
import { useCartContext } from '../../../context/Cart';


const Navbar = () => {
  const { user, isAuth } = useAuthContext()
  const { cart } = useCartContext()
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand" style={{ fontWeight: "bolder" }}>SHOP.CO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/collection/men" className="nav-link active" aria-current="page">Men Collection</Link>
              </li>
              <li className="nav-item">
                <Link to="/collection/women" className="nav-link active" aria-current="page">Women Collection</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link active" aria-current="page">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link active" aria-current="page">Contact</Link>
              </li>
            </ul>
            <div className='d-flex align-items-center' style={{ gap: '20px' }}>

              {/* User Icon */}
              {!isAuth ? (
                <Link to="/auth/login">
                  <UserOutlined style={{ fontSize: 22, color: "black" }} />
                </Link>
              ) : user?.role === "seller" ? (
                <Link to="/dashboard/admin">
                  <UserOutlined style={{ fontSize: 22, color: "black" }} />
                </Link>
              ) : user?.role === "customer" ? (
                <Link to="/customer/overview">
                  <UserOutlined style={{ fontSize: 22, color: "black" }} />
                </Link>
              ) : (
                <Link to="/auth/login">
                  <UserOutlined style={{ fontSize: 22, color: "black" }} />
                </Link>
              )}
              {/* Cart Icon with badge */}
              <Link to="/cart">
                <Badge count={cart.length} offset={[0, 0]}>
                  <ShoppingCartOutlined style={{ fontSize: 22 }} />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
