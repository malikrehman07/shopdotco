import React from 'react'
import { Col, Row } from 'antd'

const Copyright = () => {
    const year = new Date().getFullYear()
  return (
    <>
      <div className="container">
        <Row className="justify-content-center">
          <Col>
                <p className="text-dark">&copy;{year}. All Rights Reserved.</p>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Copyright
