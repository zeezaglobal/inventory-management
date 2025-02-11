import React, { useState } from "react";
import { Table, Tag, Modal } from "antd";
import ProductsModal from "../components/ProductsModal"; 

const TableComponent = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleWorkOrderClick = (record) => {
    setSelectedProducts(record.products || []);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProducts([]);
  };

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
      title: "Type",
      dataIndex: "type",
      key: "type",
     
    },
  ];

  return (
    <>
    <Table columns={columns} dataSource={data} />
    <ProductsModal isVisible={isModalVisible} onClose={handleModalClose} products={selectedProducts} />
  </>
  );
};

export default TableComponent;
