// SideNav.js
import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideNav = ({ selectedSection, handleMenuClick }) => {
  return (
    
    <Sider width={200} style={{ background: "#fff",padding:"20px" }}>
    <h1>Production Manager</h1>
      <Menu
        mode="inline"
        selectedKeys={[selectedSection]} // Controlled selected key
        style={{ height: "100%", borderRight: 0 }}
        onClick={handleMenuClick} // Update state on click
      >
        <Menu.Item key="Order">New Order</Menu.Item>
        <Menu.Item key="Wordorders">Work Orders</Menu.Item>
        <Menu.Item key="Jobcards">Job Cards</Menu.Item>
        <Menu.Item key="inventory">Inventory</Menu.Item>
        <Menu.Item key="support">Support</Menu.Item>
      </Menu>
    </Sider>
   
  );
};

export default SideNav;
