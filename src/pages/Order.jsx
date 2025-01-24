import "../pages/Order.css";
import React, { useState } from "react";

import WorkOrderFeild from "../components/WorkOrderFeild";
import { Button, InputNumber, DatePicker, Input } from "antd";
import ProductNameTable from "../components/ProductNameTable";

const Order = () => {
  const [tableData, setTableData] = useState([]);

  const [productName, setProductName] = useState("");
  const [value, setValue] = useState(1);
  const [dueDate, setDueDate] = useState(null);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleQuantityChange = (value) => {
    setValue(value);
  };

  const handleAddProduct = () => {
    if (productName.trim() && value > 0) {
      // Create a new product row
      const newProduct = {
        key: tableData.length.toString(), // Generate a unique key
        name: productName,
        quantity: value.toString(),
        price: "50 AED", // Static price
      };

      // Update the table data
      setTableData([...tableData, newProduct]);

      // Clear input fields
      setProductName("");
      setValue(1);
    }
  };

  const handleDeleteProduct = (key) => {
    setTableData(tableData.filter((item) => item.key !== key));
  };

  const handleDueDateChange = (date, dateString) => {
    setDueDate(dateString);
  };

  return (
    <div className="parent">
      <WorkOrderFeild />
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

      <Button type="primary" style={{ marginTop: 12 }}>
        Submit Work Order
      </Button>
    </div>
  );
};

export default Order;
