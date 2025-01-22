import "../pages/Order.css";
import React, { useState } from "react";

import WorkOrderFeild from "../components/WorkOrderFeild";
import EditText from "../components/EditText";
import List from "../components/List";
import Table from "../components/TableComponent";
import ProductTableName from "../components/ProductNameTable";

import { Button, InputNumber,DatePicker } from "antd";

const Order = () => {
  const [nameList, setNameList] = useState([]);
  const [productName, setProductName] = useState("");
  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onChange = (e) => {};
  const handleAddProduct = () => {
    if (productName.trim() && value > 0) {
      // Add the product name and count as an object
      setNameList([...nameList, { name: productName, count: value }]);
      setProductName(""); // Clear the product name input field
      setValue(0); // Reset the count to 0
    }
  };

  return (
    <div className="parent">
        <WorkOrderFeild />
        <DatePicker placeholder="Select Due Date" style={{ marginBottom: 12 }} onChange={onChange} />

      <div className="firstline">
      
        <EditText placeholder="Enter Product Name" />
        <InputNumber style={{ marginLeft: 12 }} min={1} max={50} defaultValue={1} onChange={onChange} />
      
      
      </div>
   
      
      <ProductTableName  />
    
      <Button className="Button" variant="contained">
        Submit Work Order
      </Button>
      <Table />
    </div>
  );
};

export default Order;
