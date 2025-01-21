// Production.js
import React from "react";
import { jsPDF } from "jspdf";

const PDFGenerater = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    const data = {
      key: '2',
      name: 'Jim Green________________________',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    };

    // Add title
    doc.text("User Details", 20, 20);

    // Add data
    doc.text(`Key: ${data.key}`, 20, 30);
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Age: ${data.age}`, 20, 50);
    doc.text(`Address: ${data.address}`, 20, 60);
    doc.text(`Tags: ${data.tags.join(", ")}`, 20, 70);
    doc.text("Enter new name:", 20, 100);
    doc.rect(20, 105, 180, 10); // Draw a rectangle for the text field
  
    // Save PDF
    doc.save("user_details.pdf");
  };

  return (
    <div>
      <h1>Generate PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerater;
