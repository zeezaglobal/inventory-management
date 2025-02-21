import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Modal, Table, Checkbox, Button, message } from "antd";

// Replace with your actual API URL

const ProductsModal = ({ isVisible, onClose, products, workOrderId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleGenerateJobCard = async () => {
    if (selectedRowKeys.length === 0) return;

    const payload = {
      workOrderId: workOrderId,
      productIds: selectedRowKeys, // Send selected product IDs
    };

    try {
      setLoading(true); // Start loading
      const response = await axios.post(`${API_BASE_URL}/jobcards`, payload);
      message.success("Job Card generated successfully!"); // Success message
      console.log("API Response:", response.data);
      onClose(); // Close the modal after success
    } catch (error) {
      console.error("Error generating job card:", error);
      message.error("Failed to generate job card. Please try again."); // Error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const productColumns = [
    {
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={() => {
            const newSelectedRowKeys = selectedRowKeys.includes(record.id)
              ? selectedRowKeys.filter((key) => key !== record.id)
              : [...selectedRowKeys, record.id];
            setSelectedRowKeys(newSelectedRowKeys);
          }}
        />
      ),
    },
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
    <Modal
      title="Products in Work Order"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="generate"
          type="primary"
          onClick={handleGenerateJobCard}
          disabled={selectedRowKeys.length === 0}
          loading={loading} // Show loading state
        >
          Generate Job Card
        </Button>,
      ]}
    >
      {products.length > 0 ? (
        <Table
          columns={productColumns}
          dataSource={products}
          pagination={false}
          rowKey="id"
        />
      ) : (
        <p>No products found for this work order.</p>
      )}
    </Modal>
  );
};

export default ProductsModal;
