import React, { useState } from "react";
import { Modal, Table, Checkbox, Button } from "antd";

const ProductsModal = ({ isVisible, onClose, products }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
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
          onClick={() => console.log("Generating Job Card", selectedRowKeys)}
          disabled={selectedRowKeys.length === 0}
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
