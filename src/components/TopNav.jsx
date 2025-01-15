// TopNav.js
import React from "react";
import { Layout, Avatar, Badge, Button } from "antd";
import { LogoutOutlined, BellOutlined } from "@ant-design/icons";

const { Header } = Layout;

const TopNav = ({ user, handleLogout }) => {
 

  return (
    <Header style={{ background: "#fff", padding: 0 }}>
   <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px", width: "100%" }}>
      <Avatar style={{ marginRight: "10px" }} size="small">
              {user.username[0]} {/* Displaying the first letter of the username */}
            </Avatar>
       
        <Badge count={user.notifications} overflowCount={99}>
          <Button icon={<BellOutlined />} />
        </Badge>
        <Button
          icon={<LogoutOutlined />}
          type="primary"
          onClick={handleLogout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default TopNav;
