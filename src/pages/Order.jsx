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
  const [clientAddress, setclientAddress] = useState("");

  const [value, setValue] = useState(1);
  const [status, setStatus] = useState(1);
  const [dueDate, setDueDate] = useState(null);

  const [workOrder, setWorkOrder] = useState({
    workOrderNumber: "",
    dueDate: "",
    status: 0,
    clientAdress: "",
    products: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleAddressChange = (e) => {
    const address = e.target.value;
    setclientAddress(address);

  // Update workOrder object
  setWorkOrder((prevWorkOrder) => ({
    ...prevWorkOrder,
    clientAddress: address,
  }));
    setStatus(0);
  };
  
  const handleQuantityChange = (value) => {
    setValue(value);
  };
  const handlePriceChange = (value) => {
    setPrice(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure due date and work order number are part of the work order
    const updatedWorkOrder = {
      ...workOrder,
      dueDate,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/workorders",
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
    if (productName.trim() && value > 0 && pricev > 0) {
      // Add product to work order
      const newProduct = {
        name: productName,
        quantity: value,
        price: pricev,
      };

      setWorkOrder((prevWorkOrder) => ({
        ...prevWorkOrder,
        products: [...prevWorkOrder.products, newProduct],
      }));

      // Update the table
      const newRow = {
        key: tableData.length.toString(),
        name: productName,
        quantity: value.toString(),
        price: `${pricev} AED`,
      };
      setTableData([...tableData, newRow]);

      // Clear input fields
      setProductName("");
      setValue(1);
      setPrice(0);
   
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

  return (
    <div className="parent">
      {contextHolder}
      <div className="firstline">
        <WorkOrderFeild
          workOrderNumber={workOrder.workOrderNumber}
          setWorkOrder={setWorkOrder}
        />
        <Input
          placeholder="Enter Client Address"
          value={clientAddress}
          onChange={handleAddressChange}
        />
      </div>
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
