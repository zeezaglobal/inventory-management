import "../pages/Order.css";
import React, { useState } from "react";
import axios from "axios";

import { Button, InputNumber, DatePicker, Input, message, Radio } from "antd";
import ProductNameTable from "../components/ProductNameTable";

const Order = () => {
  const [workOrderNumber, setworkOrderNumber] = useState("");
  const [clientAddress, setclientAddress] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [receivedDate, setreceivedDate] = useState(null);
  const [status, setStatus] = useState(0);

  const [tableData, setTableData] = useState([]);
  const [type, setType] = useState("");
  const [productName, setProductName] = useState("");
  const [value, setValue] = useState(1);
  const [products, setProducts] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [workOrder, setWorkOrder] = useState({
    workOrderNumber: "",
    dueDate: "",
    receivedDate: "",
    status: 0,
    clientAdress: "",
    products: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleAddressChange = (e) => {
    const address = e.target.value;
    setclientAddress(address);
  };

  const handleQuantityChange = (value) => {
    setValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure due date and work order number are part of the work order
    const updatedWorkOrder = {
      workOrderNumber,
      clientAddress,
      receivedDate,
      dueDate,
      status,
      products,
    };
    console.log(
      "Updated Work Order:",
      JSON.stringify(updatedWorkOrder, null, 2)
    );
    try {
      const response = await axios.post(
        `${API_BASE_URL}/workorders`,
        updatedWorkOrder,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the backend expects JSON
            // Add any other headers you might need (e.g., authentication tokens)
          },
        }
      );
      console.log("Work order created successfully:", response.data);
      messageApi.open({
        type: "success",
        content: "Work Order Created",
      });
    } catch (error) {
      console.error("Error creating work order:", error);
      messageApi.open({
        type: "error",
        content: "Something went wrong!! " + error.message,
      });
    }
  };
  const handleAddProduct = () => {
    if (productName.trim() && value > 0) {
      // Add product to work order
      const newProduct = {
        name: productName,
        quantity: value,
        type: type,
      };

      setProducts([...products, newProduct]);

      // Update the table
      const newRow = {
        key: tableData.length.toString(),
        name: productName,
        quantity: value.toString(),
        type: type.toString(),
      };
      setTableData([...tableData, newRow]);

      // Clear input fields
      setProductName("");
      setValue(1);
    }
  };

  const handleDeleteProduct = (key) => {
    const updatedTableData = tableData.filter((item) => item.key !== key);
    setTableData(updatedTableData);

    // Remove product from work order
    const productKey = parseInt(key);
    setWorkOrder((prevWorkOrder) => ({
      ...prevWorkOrder,
      products: prevWorkOrder.products.filter(
        (_, index) => index !== productKey
      ),
    }));
  };

  const handleDueDateChange = (date, dateString) => {
    setDueDate(dateString);
  };
  const handleReceivedDateChange = (date, dateString) => {
    setreceivedDate(dateString);
  };

  return (
    <div className="parent">
      {contextHolder}
      <div className="firstline">
        <Input
          addonBefore="WO#"
          placeholder="Work Order Number"
          value={workOrderNumber} // Controlled input
          onChange={(e) => setworkOrderNumber(e.target.value)}
        />
        <Input
         style={{marginLeft: 12 }}
          placeholder="Customer Name"
          value={clientAddress}
          onChange={handleAddressChange}
        />
      </div>
      <div className="firstline">
        <DatePicker
          placeholder="Select Due Date"
          style={{ width: 200, marginRight: 12 }}
          onChange={handleDueDateChange}
        />
        <DatePicker
          placeholder="Select Received Date"
          style={{ width: 200 }}
          onChange={handleReceivedDateChange}
        />
      </div>
      <div className="firstline">
        <Input
          placeholder="Enter Product Name"
          value={productName}
          style={{ width: 500 }}
          onChange={handleProductNameChange}
        />
        <InputNumber
          style={{ marginLeft: 12 }}
          min={1}
          max={50}
          value={value}
          onChange={handleQuantityChange}
        />
        <Radio.Group
          value={type}
          onChange={handleTypeChange}
          optionType="button"
          buttonStyle="solid"
          style={{ marginLeft: 12 }}
        >
          <Radio value="Pair">Pair</Radio>
          <Radio value="Unit">Unit</Radio>
        </Radio.Group>
        <Button
          type="primary"
          className="editable-add-btn"
          style={{ width: 100, marginLeft: 12 }}
          onClick={handleAddProduct}
        >
          Add
        </Button>
      </div>

      <ProductNameTable dataSource={tableData} onDelete={handleDeleteProduct} />

      <Button type="primary" style={{ marginTop: 12 }} onClick={handleSubmit}>
        Submit Work Order
      </Button>
    </div>
  );
};

export default Order;
