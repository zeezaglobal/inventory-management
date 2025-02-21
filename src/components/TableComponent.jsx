import React, { useState } from "react";
import { Table, Tag } from "antd";
import ProductsModal from "../components/ProductsModal"; 

const TableComponent = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [workOrderId, setWorkOrderId] = useState(null); // Store work order ID

  const handleWorkOrderClick = (record) => {
    setSelectedProducts(record.products || []);
    setWorkOrderId(record.key); // Store work order ID
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProducts([]);
    setWorkOrderId(null); // Reset work order ID
  };

  // Sort data by closest due date (optional)
  // const sortedData = data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Reverse the data
  const reversedData = data.slice().reverse();

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
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {status.map((statusItem) => {
            const colorMap = {
              pending: "gold",
              processing: "blue",
              cancelled: "red",
              completed: "green",
            };
            return (
              <Tag color={colorMap[statusItem] || "default"} key={statusItem}>
                {statusItem.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={reversedData} /> {/* Use reversed data */}
      <ProductsModal 
        isVisible={isModalVisible} 
        onClose={handleModalClose} 
        products={selectedProducts} 
        workOrderId={workOrderId} // Pass workOrderId to modal
      />
    </>
  );
};

export default TableComponent;
