import React, { useEffect, useState } from "react";
import Table from "../components/TableComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WorkOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleGenerateJobCard = (record) => {
    console.log("Generating Job Card for:", record);
    navigate("/pdf-generator", { state: { jobData: record } });
    // Add your logic here, e.g., navigate to another page or trigger a modal.
  };

  // Map status codes to corresponding labels
  const mapStatus = (statusCode) => {
    switch (statusCode) {
      case 0:
        return "pending";
      case 1:
        return "cancelled";
      case 2:
        return "processing";
      case 3:
        return "completed";
      default:
        return "unknown";
    }
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/workorders`);
        // Transform the response data
        const formattedData = response.data.map((item) => ({
          key: item.id, // Use 'id' as the key
          workOrder: item.workOrderNumber, // Use 'workOrderNumber'
          dueDate: item.dueDate, // Use 'dueDate'
          createdAt: item.createdAt,
          client: item.clientAddress, // Use 'clientAddress'
          status: [mapStatus(parseInt(item.status, 10))], // Convert status code to label
          products: item.workOrderProducts.map((productItem) => ({
            id: productItem.product.id,
            name: productItem.product.name,
            type: productItem.product.type,
            quantity: productItem.quantity,
            status: productItem.status,
          })),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table data={data} handleGenerateJobCard={handleGenerateJobCard} />
      )}
    </div>
  );
};

export default WorkOrders;
