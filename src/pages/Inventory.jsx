import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  InputNumber,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Inventory = () => {
  const [products, setProducts] = useState([
    {
      key: 1,
      itemCode: "Product A",
      category: "Category A",
      description: "Sample description A",
      location: "Shelf A",
      quantity: 10,
      price: 100,
    },
    {
      key: 2,
      itemCode: "Product B",
      category: "Category B",
      description: "Sample description B",
      location: "Shelf B",
      quantity: 20,
      price: 200,
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      setProducts([
        ...products,
        { key: Date.now(), ...values },
      ]);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleDelete = (key) => {
    setProducts(products.filter((item) => item.key !== key));
  };

  const handleStockChange = (value, key) => {
    setProducts(
      products.map((item) =>
        item.key === key ? { ...item, quantity: value } : item
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    `${product.itemCode} ${product.description}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Item Name/Code",
      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Inventory Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleStockChange(value, record.key)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹ ${Number(price).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Inventory Section</h2>
      <Input
        placeholder="Search by Item Code or Description"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{ marginLeft: 10 }}
      >
        Add Product
      </Button>
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="key"
        style={{ marginTop: 16 }}
      />

      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleAddProduct}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="itemCode"
            label="Item Name/Code"
            rules={[{ required: true, message: "Enter item name or code" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Enter category" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Enter product description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="location"
            label="Inventory Location"
            rules={[{ required: true, message: "Enter inventory location" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Enter quantity" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) => `₹ ${value}`}
              parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;
