import React, { useState } from "react";
import { Space, Table, Tag, Modal, Menu, Dropdown,message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";

const TableComponent = ({ data, handleGenerateJobCard }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const handleWorkOrderClick = (record) => {
    setSelectedProducts(record.products || []); // Set the products for the selected work order
    setIsModalVisible(true); // Show the modal
  };
  const handleMenuClick = (e) => {
    setSelectedStatus(e.key);
  };
  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
    setSelectedProducts([]); // Clear the products
  };
  const handleStatusClick = (status) => {
    setSelectedStatus(status); // Set the selected status
    setStatusModalVisible(true); // Show the status modal
  };
  const handleOnCancelClick = (status) => {
    setStatusModalVisible(false);
    setSelectedStatus("");
  };
  
  const handleStatusModalClose = async () => {
    try {
      // Perform the API call
      const response = await axios.post('/api/update-status', { status: selectedStatus });
  
      // Check the response if needed
      if (response.status === 200) {
        // API call successful, close the modal and clear the status
        setStatusModalVisible(false);
        setSelectedStatus("");
      } else {
        console.error("Failed to update status:", response.data);
        messageApi.open({
          type: "error",
          content: "Something went wrong!! " 
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);
      messageApi.open({
        type: "error",
        content: "Something went wrong!! " + error.message,
      });
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Pending">Pending</Menu.Item>
      <Menu.Item key="Processing">Processing</Menu.Item>
      <Menu.Item key="Cancelled">Cancelled</Menu.Item>
      <Menu.Item key="Completed">Completed</Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: "Work Order",
      dataIndex: "workOrder",
      key: "workOrder",
      render: (text, record) => (
        <a onClick={() => handleWorkOrderClick(record)}>{text}</a>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status.map((statusItem) => {
            let color;
            switch (statusItem) {
              case "pending":
                color = "gold";
                break;
              case "processing":
                color = "blue";
                break;
              case "cancelled":
                color = "red";
                break;
              case "completed":
                color = "green";
                break;
              default:
                color = "default";
                break;
            }
            return (
              <Tag
                color={color}
                key={statusItem}
                style={{ cursor: "pointer" }}
                onClick={() => handleStatusClick(statusItem)}
              >
                {statusItem.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status.includes("completed") ? null : (
            <a onClick={() => handleGenerateJobCard(record)}>
              Generate Job Card
            </a>
          )}
        </Space>
      ),
    },
  ];

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={data} />

      {/* Modal for displaying products */}
      <Modal
        title="Products in Work Order"
        visible={isModalVisible}
        onCancel={handleModalClose}
        onOk={handleModalClose}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {/* <Button>Edit Status</Button> */}
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        {selectedProducts.length > 0 ? (
          <Table
            columns={productColumns}
            dataSource={selectedProducts}
            pagination={false}
            rowKey="id" // Ensure each product has a unique `id` or similar key
          />
        ) : (
          <p>No products found for this work order.</p>
        )}
      </Modal>
      {/* Modal for status details */}
      <Modal
        title={`Status Details - ${selectedStatus.toUpperCase()}`}
        visible={statusModalVisible}
        onCancel={handleOnCancelClick}
        onOk={handleStatusModalClose}
      >
        <Dropdown overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            {selectedStatus}

            <DownOutlined />
          </a>
        </Dropdown>
        {/* Add dynamic content here as needed */}
      </Modal>
    </>
  );
};

export default TableComponent;
