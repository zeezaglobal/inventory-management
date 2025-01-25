import * as React from "react";
import { Input } from "antd";

export default function WorkOrderFeild({ workOrderNumber, setWorkOrder }) {
  // Handle changes to the work order number
  const handleChange = (e) => {
    const value = e.target.value;
    setWorkOrder((prevWorkOrder) => ({
      ...prevWorkOrder,
      workOrderNumber: value,
    }));
  };

  return (
    <div>
      <div style={{ marginRight: 12, marginBottom: 12 }}>
        <Input
          addonBefore="WO#"
          placeholder="Work Order Number"
          value={workOrderNumber} // Bind the value from parent
          onChange={handleChange} // Update the value in parent on change
        />
      </div>
    </div>
  );
}
