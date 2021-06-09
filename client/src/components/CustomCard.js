import React, { Component } from 'react';
import { Card } from 'antd';

class CustomCard extends Component {
  render() {
    return (
      <div className="" style={{display:'flex'}}>
        <Card title="Chart1" bordered={false} style={{margin:10}}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    )
  }
}

export default CustomCard