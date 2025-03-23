import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, InputNumber, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Inventory = () => {
  const [products, setProducts] = useState([
    { key: 1, name: "Product A", stock: 10 },
    { key: 2, name: "Product B", stock: 20 },
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    form.validateFields().then(values => {
      setProducts([...products, { key: Date.now(), ...values }]);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleDelete = (key) => {
    setProducts(products.filter(item => item.key !== key));
  };

  const handleStockChange = (value, key) => {
    setProducts(products.map(item => (item.key === key ? { ...item, stock: value } : item)));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text, record) => (
        <InputNumber min={0} value={text} onChange={(value) => handleStockChange(value, record.key)} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Inventory Section</h2>
      <Input
        placeholder="Search Products"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ marginLeft: 10 }}>
        Add Product
      </Button>
      <Table dataSource={filteredProducts} columns={columns} rowKey="key" style={{ marginTop: 16 }} />

      <Modal title="Add Product" open={isModalOpen} onOk={handleAddProduct} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true, message: "Enter product name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Enter stock quantity" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;
