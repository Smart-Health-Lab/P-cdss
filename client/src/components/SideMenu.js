import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { PieChartOutlined, AuditOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Menu theme="dark" selectedKeys={this.props.selectedMenu} mode="inline">
        <SubMenu
          key="sub1"
          title={<span style={{ fontSize: 20 }}>ICT injury</span>}
        >
          <Menu.Item
            key="1"
            onClick={() => {
              this.props.changeMenu("1");
            }}
          >
            <AuditOutlined style={{ fontSize: 20 }} />
            <span style={{ fontSize: 20 }}>Information</span>
            <Link to="/informationIct" />
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              this.props.changeMenu("2");
            }}
          >
            <PieChartOutlined style={{ fontSize: 20 }} />
            <span style={{ fontSize: 20 }}>Chart</span>
            <Link to="/chartIct" />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span style={{ fontSize: 20 }}>OHCA</span>}>
          <Menu.Item
            key="3"
            onClick={() => {
              this.props.changeMenu("3");
            }}
          >
            <AuditOutlined style={{ fontSize: 20 }} />
            <span style={{ fontSize: 20 }}>Information</span>
            <Link to="/informationOhca" />
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              this.props.changeMenu("4");
            }}
          >
            <PieChartOutlined style={{ fontSize: 20 }} />
            <span style={{ fontSize: 20 }}>Result</span>
            <Link to="/chartOhca" />
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SideMenu;
