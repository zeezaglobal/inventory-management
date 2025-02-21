import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the jsPDF AutoTable plugin

const JobCards = () => {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/jobcards`) // Use base URL for the API call
      .then((response) => {
        setJobCards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [API_BASE_URL]);

  const handleJobCardClick = (jobCard) => {
    setSelectedJobCard(jobCard);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedJobCard(null);
  };

  const columns = [
    {
      title: "Job Card Number",
      dataIndex: "jobCardNumber",
      key: "jobCardNumber",
      render: (text, record) => (
        <a onClick={() => handleJobCardClick(record)}>{text}</a>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Work Order Number",
      dataIndex: ["workOrder", "workOrderNumber"],
      key: "workOrderNumber",
    },
  ];

  const jobCardProductColumns = [
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    const jobCardData = selectedJobCard ? selectedJobCard : {};

    doc.text(`Job Card Number: ${jobCardData.jobCardNumber}`, 10, 10);
    doc.text(`Created At: ${new Date(jobCardData.createdAt).toLocaleString()}`, 10, 20);
    doc.text(`Work Order Number: ${jobCardData.workOrder?.workOrderNumber}`, 10, 30);
    doc.text(`Job Card Products:`, 10, 40);

    const productData = jobCardData.jobCardProducts.map((product) => [
      product.product.name,
      product.quantity,
    ]);

    doc.autoTable({
      head: [['Product Name', 'Quantity']],
      body: productData,
      startY: 50,
    });

    doc.save(`JobCard_${jobCardData.jobCardNumber}.pdf`);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Job Card Section</h2>
      <Table dataSource={jobCards} columns={columns} loading={loading} rowKey="id" />

      <Modal
        title={`Products for Job Card: ${selectedJobCard?.jobCardNumber}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="print" type="primary" onClick={generatePDF}>
            Create Print
          </Button>,
        ]}
      >
        {selectedJobCard && (
          <Table
            dataSource={selectedJobCard.jobCardProducts}
            columns={jobCardProductColumns}
            rowKey="id"
            pagination={false}
          />
        )}
      </Modal>
    </div>
  );
};

export default JobCards;
