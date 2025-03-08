import React, { useState } from "react";
import { Table, Tag ,Button,Alert,Space} from "antd";
import ProductsModal from "../components/ProductsModal"; 
import axios from "axios";

const TableComponent = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [workOrderId, setWorkOrderId] = useState(null); // Store work order ID
  const [alertVisible, setAlertVisible] = useState(false); // Track alert visibility
  const [alertMessage, setAlertMessage] = useState("");
  const [dataSet, setDataSet] = useState(data);
  const [newStatus, setNewStatus] = useState("3");

  const handleWorkOrderClick = (record) => {
    setSelectedProducts(record.products || []);
    setWorkOrderId(record.key); // Store work order ID
    setIsModalVisible(true);
    
  };
  const confirmStatusChange = async () => {
    console.log("Error:", workOrderId);
    if (!workOrderId) return;

    try {
      const response = await axios.put(
        `${API_BASE_URL}/workorders/${workOrderId}/status?status=${newStatus}`
      );

      if (response.status === 200) {
        setAlertMessage(`Status updated to: ${newStatus}`);
        const updatedData = dataSet.map(item => 
          item.key === workOrderId ? { ...item, status: ["Completed"] } : item
        );
        
        // Set the new data to trigger table re-render
        setDataSet(updatedData);
      } else {
        setAlertMessage("Failed to update status.");
      }
    } catch (error) {
      setAlertMessage("Error updating status.");
      console.error("Error:", error);
    }

    setAlertVisible(false);
  };
  const handleChangeStatus = (record) => {
    console.log("handleChangeStatus triggered for:", record); // Debugging
    setWorkOrderId(record.key);
    const newStatus = record.status.includes("pending")
      ? ["processing"]
      : record.status.includes("processing")
      ? ["completed"]
      : ["pending"];

      setAlertMessage(`Status changed to: ${newStatus}`);
    setAlertVisible(true);

    // Auto-hide alert after a few seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 9000);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProducts([]);
    setWorkOrderId(null); // Reset work order ID
  };

  // Sort data by closest due date (optional)
  // const sortedData = data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Reverse the data
  const reversedData = dataSet.slice().reverse();

  const columns = [
    {
      title: "Work Order",
      dataIndex: "workOrder",
      key: "workOrder",
      render: (text, record) => (
        <a onClick={() => handleWorkOrderClick(record)}>{text}</a>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {status.map((statusItem) => {
            const colorMap = {
              pending: "gold",
              processing: "blue",
              cancelled: "red",
              completed: "green",
            };
            return (
              <Tag color={colorMap[statusItem] || "default"} key={statusItem}>
                {statusItem.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },  {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleChangeStatus(record)}>
          Completed
        </Button>
      ),
    },
  ];

  return (
    <>
     {alertVisible && (
        <Alert
        message="Are you sure?"
        description="Making a workorder complete mean all the jobs related to this work order has completed."
        type="info"
        action={
          <Space direction="vertical">
              <Button size="small" type="primary" onClick={confirmStatusChange}>
                Yes
              </Button>
              <Button
                size="small"
                danger
                ghost
                onClick={() => setAlertVisible(false)}
              >
                No
              </Button>
            </Space>
        }
        closable
      />
      )}

      <Table columns={columns} dataSource={reversedData} /> {/* Use reversed data */}
      <ProductsModal 
        isVisible={isModalVisible} 
        onClose={handleModalClose} 
        products={selectedProducts} 
        workOrderId={workOrderId} // Pass workOrderId to modal
      />
    </>
  );
};

export default TableComponent;
