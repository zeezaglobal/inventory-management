import "../pages/Order.css";
import React, { useState } from "react";

import EditableTextField from "../components/EditableTextField";
import List from "../components/List";
import Button from "@mui/material/Button";
const Order = () => {
  const [nameList, setNameList] = useState([]);
  const [productName, setProductName] = useState("");
  const handleAddProduct = () => {
    if (productName.trim()) {
      setNameList([...nameList, productName]); // Add the new product to the list
      setProductName(""); // Clear the input field after adding
    }
  };
 
  return (
    <div className="parent">
      <EditableTextField label="Enter Work Order Number" />
      <EditableTextField
        label="Enter Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button
        className="Button"
        variant="contained"
        sx={{ width: "200px" }}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>

      <List items={nameList} />
    </div>
  );
};

export default Order;
