import React from "react";
import { jsPDF } from "jspdf";

const PDFGenerater = () => {
  const generatePDF = () => {
    // Create a wider PDF (e.g., landscape orientation with custom width)
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210], // Custom width and height: 297mm x 210mm (A4 Landscape)
    });

    // Add header
    doc.setFontSize(16);
    doc.text("ONTIDES ENGINEERING WORKS L.L.C", 20, 20);
    doc.setFontSize(12);
    doc.text("JOB CARD", 135, 30); // Centered Job Card title
    doc.setFontSize(10);
    doc.text("Work Order No.: ____________________", 20, 40);
    doc.text("Job Card No.: 0035", 240, 40);
    doc.text("Date: ____________________", 240, 50);

    // Table settings
    const tableStartY = 60;
    const rowHeight = 10;
    const numRows = 10;

    // Draw outer border for the table
    doc.rect(20, tableStartY, 260, numRows * rowHeight);

    // Draw vertical lines for columns
    const colPositions = [30, 120, 160, 200, 230, 260]; // Adjusted for wider layout
    colPositions.forEach((x) => {
      doc.line(x, tableStartY, x, tableStartY + numRows * rowHeight);
    });

    // Draw horizontal lines for rows
    for (let i = 0; i <= numRows; i++) {
      doc.line(20, tableStartY + i * rowHeight, 280, tableStartY + i * rowHeight); // Wider width
    }

    // Table headers
    doc.text("Sl. No.", 22, tableStartY + 7);
    doc.text("Description", 50, tableStartY + 7);
    doc.text("Unit", 125, tableStartY + 7);
    doc.text("Qty", 165, tableStartY + 7);
    doc.text("Completed Qty", 205, tableStartY + 7);
    doc.text("Duration (Hrs)", 235, tableStartY + 7); // Adjusted position
    doc.text("Remarks", 265, tableStartY + 7); // Adjusted position

    // Footer details
    const footerStartY = tableStartY + numRows * rowHeight + 10;
    doc.text("Prepared by: ____________________", 20, footerStartY);
    doc.text("Foreman Signature: ____________________", 200, footerStartY);

    // Save PDF
    doc.save("job_card_wide.pdf");
  };

  return (
    <div>
      <h1>Generate PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerater;
