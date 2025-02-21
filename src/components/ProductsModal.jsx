import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Modal, Table, Checkbox, Button, message } from "antd";

const ProductsModal = ({ isVisible, onClose, products, workOrderId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();
  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleGenerateJobCard = async () => {
    if (selectedRowKeys.length === 0) return;

    const payload = {
      workOrderId: workOrderId,
      productIds: selectedRowKeys,
     
    };
    console.log("Generated Payload:", JSON.stringify(payload, null, 2));
    try {
      setLoading(true);
     
      const response = await axios.post(`${API_BASE_URL}/jobcards`, payload);
      messageApi.open({
        type: "success",
        content: "Job card Created",
      });
      console.log("API Response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error generating job card:", error);
     
      messageApi.open({
        type: "error",
        content: "Something went wrong!! " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const productColumns = [
    {
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
        checked={selectedRowKeys.some((item) => item.id === record.id)}
        onChange={() => {
          const existingItem = selectedRowKeys.find((item) => item.id === record.id);
    
          if (record.status !== 1) { // Only allow updates if status is not 1
            if (existingItem) {
              // If the item is already selected, we remove it from selectedRowKeys
              const newSelectedRowKeys = selectedRowKeys.filter((item) => item.id !== record.id);
              setSelectedRowKeys(newSelectedRowKeys);
            } else {
              // Add the new item without changing the quantity
              setSelectedRowKeys([...selectedRowKeys, { id: record.id, quantity: record.quantity }]);
            }
          }
        }}
        disabled={record.status === 1} // Disable checkbox if status is 1
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
    <div className="parent">
      {contextHolder}
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
          loading={loading}
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
    </div>
  );
};

export default ProductsModal;
