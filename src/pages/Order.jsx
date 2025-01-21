import "../pages/Order.css";
import React, { useState } from "react";

import EditableTextField from "../components/EditableTextField";
import List from "../components/List";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Order = () => {
  const [nameList, setNameList] = useState([]);
  const [productName, setProductName] = useState("");
  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

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
      <EditableTextField label="Enter Work Order Number" />
      <EditableTextField
        label="Enter Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label htmlFor="number-picker">Product Count: </label>
      <input
        id="number-picker"
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        max="100"
        step="1"
      />
      <Button className="Button" variant="contained" onClick={handleAddProduct}>
        Add Product
      </Button>
      <List items={nameList} />
      <EditableTextField label="Customer Name" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Due Date"
          value={dueDate}
          onChange={(newDate) => setDueDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button className="Button" variant="contained" >
       Submit Work Order
      </Button>
    </div>
  );
};

export default Order;
