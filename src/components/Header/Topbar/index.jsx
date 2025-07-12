import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'


const {Paragraph} = Typography
const Topbar = () => {
  return (
    <>
      <div className="container-fluid bg-black">
        <div className="row">
            <div className="col">
                <Paragraph className='text-center text-white my-1'>Sign Up and get 20% Off to Your First Order. <Link className='link-info'>Sign Up Now</Link></Paragraph>
            </div>
        </div>
      </div>
    </>
  )
}

export default Topbar
