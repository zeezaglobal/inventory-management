import "../pages/Order.css";
import React, { useState } from "react";
import axios from "axios";

import { Button, InputNumber, DatePicker, Input, message, Select } from "antd";
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
  const [value, setValue] = useState(0);
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
  const clearFields = () => {
    setworkOrderNumber("");
    setclientAddress("");
    setDueDate(null);
    setreceivedDate(null);
    setStatus(0);
    setTableData([]);
    setType("");
    setProductName("");
    setValue(0);
    setProducts([]);
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
      clearFields();
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
    setDueDate(date);
  };
  const handleReceivedDateChange = (date, dateString) => {
    setreceivedDate(date);
  };

  return (
    <div className="parent">
      {contextHolder}
      <div className="firstline">
        <Input
          addonBefore="WO#"
          placeholder="Work Order Number"
          style={{  marginRight: 12 }}
          value={workOrderNumber} // Controlled input
          onChange={(e) => setworkOrderNumber(e.target.value)}
        />
       <DatePicker
          placeholder="Select Due Date"
          style={{ width: 300, marginRight: 12 }}
          value={dueDate || null} 
          onChange={handleDueDateChange}
        />
        <DatePicker
          placeholder="Select Received Date"
          style={{ width: 300 }}
          value={receivedDate || null} 
          onChange={handleReceivedDateChange}
        />
      </div>
      <div className="firstline">
      <Input
         style={{ }}
          placeholder="Customer Name"
          value={clientAddress}
          onChange={handleAddressChange}
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
          min={0}
          max={5000}
          value={value}
          onChange={handleQuantityChange}
        />
        <Select
          style={{ marginLeft: 12, width: 120 }}
          value={type}
          onChange={setType}
          placeholder="Select Type"
        >
          <Select.Option value="Nos">Nos</Select.Option>
          <Select.Option value="Pair">Pair</Select.Option>
          <Select.Option value="Set">Set</Select.Option>
        </Select>
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
