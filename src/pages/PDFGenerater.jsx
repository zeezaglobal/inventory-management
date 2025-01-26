import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const PDFGenerater = () => {
  // Retrieve job card details from routing state
  const location = useLocation();
  const jobData = location.state?.jobData;

  const generatePDF = () => {
    if (!jobData) {
      alert("No job data available to generate the PDF.");
      return;
    }

    // Create a wider PDF (landscape orientation)
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210], // A4 Landscape
    });

    // Add header
    doc.setFontSize(16);
    doc.text("ONTIDES ENGINEERING WORKS L.L.C", 20, 20);
    doc.setFontSize(12);
    doc.text("JOB CARD", 135, 30); // Centered Job Card title
    doc.setFontSize(10);
    doc.text(`Work Order No.: ${jobData.workOrder || "____________________"}`, 20, 40);
    doc.text(`Job Card No.: ${jobData.jobCardNumber || "0035"}`, 240, 40);
    doc.text(`Date: ${jobData.date || "____________________"}`, 240, 50);

    // Table settings
    const tableStartY = 60;
    const rowHeight = 10;

    // Draw outer border for the table
    const numRows = jobData.products.length || 1; // Number of products as rows
    doc.rect(20, tableStartY, 260, numRows * rowHeight);

    // Draw vertical lines for columns
    const colPositions = [30, 90, 130, 160, 190, 220, 250]; // Adjusted for better alignment
    colPositions.forEach((x) => {
      doc.line(x, tableStartY, x, tableStartY + numRows * rowHeight);
    });

    // Draw horizontal lines for rows
    for (let i = 0; i <= numRows; i++) {
      doc.line(20, tableStartY + i * rowHeight, 280, tableStartY + i * rowHeight); // Wider width
    }

    // Table headers
    doc.setFontSize(10);
    doc.text("Sl. No.", 22, tableStartY + 7);
    doc.text("Description", 50, tableStartY + 7);
    doc.text("Unit", 120, tableStartY + 7);
    doc.text("Qty", 150, tableStartY + 7);
    doc.text("Completed Qty", 180, tableStartY + 7);
    doc.text("Duration (Hrs)", 210, tableStartY + 7);
    doc.text("Remarks", 240, tableStartY + 7);

    // Populate table rows with job data
    jobData.products.forEach((product, index) => {
      const rowY = tableStartY + (index + 1) * rowHeight;
      doc.text(`${index + 1}`, 22, rowY - 3);
      doc.text(product.description || "N/A", 50, rowY - 3);
      doc.text(product.unit || "N/A", 120, rowY - 3);
      doc.text(product.quantity?.toString() || "N/A", 150, rowY - 3);
      doc.text(product.completedQty?.toString() || "N/A", 180, rowY - 3);
      doc.text(product.durationHrs?.toString() || "N/A", 210, rowY - 3);
      doc.text(product.remarks || "N/A", 240, rowY - 3);
    });

    // Footer details
    const footerStartY = tableStartY + numRows * rowHeight + 10;
    doc.text("Prepared by: ____________________", 20, footerStartY);
    doc.text("Foreman Signature: ____________________", 200, footerStartY);

    // Save PDF
    doc.save(`job_card_${jobData.workOrder || "default"}.pdf`);
  };

  return (
    <div>
      <h1>Generate PDF</h1>
      {jobData ? (
        <div>
          <p>Work Order No.: {jobData.workOrder}</p>
          <p>Job Card No.: {jobData.jobCardNumber}</p>
          <p>Date: {jobData.date}</p>
          <button onClick={generatePDF}>Generate PDF</button>
        </div>
      ) : (
        <p>No job data available. Navigate from the Job Card page to generate a PDF.</p>
      )}
    </div>
  );
};

export default PDFGenerater;
