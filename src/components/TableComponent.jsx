import React, { useState } from 'react';
import { Space, Table, Tag, Modal } from 'antd';

const TableComponent = ({ data, handleGenerateJobCard }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleWorkOrderClick = (record) => {
    setSelectedProducts(record.products || []); // Set the products for the selected work order
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
    setSelectedProducts([]); // Clear the products
  };

  const columns = [
    {
      title: 'Work Order',
      dataIndex: 'workOrder',
      key: 'workOrder',
      render: (text, record) => (
        <a onClick={() => handleWorkOrderClick(record)}>{text}</a>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((statusItem) => {
            let color;
            switch (statusItem) {
              case 'pending':
                color = 'gold';
                break;
              case 'processing':
                color = 'blue';
                break;
              case 'cancelled':
                color = 'red';
                break;
              case 'completed':
                color = 'green';
                break;
              default:
                color = 'default';
                break;
            }
            return (
              <Tag color={color} key={statusItem}>
                {statusItem.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status.includes('completed') ? null : (
            <a onClick={() => handleGenerateJobCard(record)}>Generate Job Card</a>
          )}
        </Space>
      ),
    },
  ];

  const productColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />

      {/* Modal for displaying products */}
      <Modal
        title="Products in Work Order"
        visible={isModalVisible}
        onCancel={handleModalClose}
        onOk={handleModalClose}
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
    </>
  );
};

export default TableComponent;
