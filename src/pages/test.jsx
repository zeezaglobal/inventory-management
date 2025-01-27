import "../pages/Order.css";
import React, { useState } from "react";
import axios from "axios";
import WorkOrderFeild from "../components/WorkOrderFeild";
import { Button, InputNumber, DatePicker, Input, message } from "antd";
import ProductNameTable from "../components/ProductNameTable";

const Order = () => {
  const [tableData, setTableData] = useState([]);
  const [pricev, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [value, setValue] = useState(1);
  const [dueDate, setDueDate] = useState(null);

  const [workOrder, setWorkOrder] = useState({
    workOrderNumber: "",
    dueDate: "",
    products: [],
  });

  const [messageApi, contextHolder] = message.useMessage();

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleQuantityChange = (value) => {
    setValue(value);
  };
  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWorkOrder = {
      ...workOrder,
      dueDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/workorders",
        updatedWorkOrder,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("Work order created successfully:", response.data);
      message.success("Work order created!");
    } catch (error) {
      console.error("Error creating work order:", error);

      if (error.response) {
        console.error("Response error:", error.response.data);
        message.error(`Error creating work order: ${error.response.data}`);
      } else if (error.request) {
        console.error("No response:", error.request);
        message.error("Error creating work order: No response from server");
      } else {
        console.error("General error:", error.message);
        message.error(`Error creating work order: ${error.message}`);
      }
    }
  };

  const handleAddProduct = () => {
    if (productName.trim() && value > 0 && pricev > 0) {
      const newProduct = {
        name: productName,
        quantity: value,
        price: pricev,
      };

      setWorkOrder((prevWorkOrder) => ({
        ...prevWorkOrder,
        products: [...prevWorkOrder.products, newProduct],
      }));

      const newRow = {
        key: tableData.length.toString(),
        name: productName,
        quantity: value.toString(),
        price: `${pricev} AED`,
      };
      setTableData([...tableData, newRow]);

      setProductName("");
      setValue(1);
      setPrice(0);
    } else {
      message.error("Please fill out product details correctly.");
    }
  };

  const handleDeleteProduct = (key) => {
    const updatedTableData = tableData.filter((item) => item.key !== key);
    setTableData(updatedTableData);

    const productKey = parseInt(key);
    setWorkOrder((prevWorkOrder) => ({
      ...prevWorkOrder,
      products: prevWorkOrder.products.filter((_, index) => index !== productKey)
    }));
    message.success("Product deleted successfully.");
  };

  const handleDueDateChange = (date, dateString) => {
    setDueDate(dateString);
  };

  return (
    <div className="parent">
      {contextHolder}
      <WorkOrderFeild workOrderNumber={workOrder.workOrderNumber} setWorkOrder={setWorkOrder} />
      <DatePicker
        placeholder="Select Due Date"
        style={{ marginBottom: 12 }}
        onChange={handleDueDateChange}
      />

      <div className="firstline">
        <Input
          placeholder="Enter Product Name"
          value={productName}
          style={{ width: 200 }}
          onChange={handleProductNameChange}
        />
        <InputNumber
          style={{ marginLeft: 12 }}
          min={1}
          max={50}
          value={value}
          onChange={handleQuantityChange}
        />
        <InputNumber
          defaultValue={0}
          style={{ marginLeft: 12 }}
          value={pricev}
          onChange={handlePriceChange}
          formatter={(value) =>
            `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/AED\s?|(,*)/g, "")}
        />
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
