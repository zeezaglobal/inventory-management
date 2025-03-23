// Dashboard.js
import React, { useState } from "react";
import { Layout } from "antd";

// Importing components for each section
import Production from "./Order"; // Create this component
import Inventory from "./Inventory"; // Create this component
import Support from "./Support";
import WorkOrders from "./WorkOrders"; // Create this component
import JobCards from "./JobCards"; 
// Import TopNav and SideNav components
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import Order from "./Order";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("production"); // Default section

  const handleMenuClick = (e) => {
    setSelectedSection(e.key); // Set the active section
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "Order":
        return <Order />;
      case "Wordorders":
        return <WorkOrders />;
      case "Jobcards":
        return <JobCards />;
      case "inventory":
        return <Inventory />;
      case "support":
        return <Support />;
      default:
        return <Production />;
    }
  };

  const handleLogout = () => {
    // Handle logout functionality, for example:
    console.log("User logged out");
    // Redirect to login page or perform other logout actions
  };

  const user = {
    username: "John Doe",
    userId: "JD123",
    notifications: 3,
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Navigation Bar */}
      <TopNav user={user} handleLogout={handleLogout} />

      <Layout>
        {/* Sidebar Navigation */}
        <SideNav
          selectedSection={selectedSection}
          handleMenuClick={handleMenuClick}
        />

        {/* Main Content */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <div
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              {renderSection()} {/* Render the selected section's component */}
            </div>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
