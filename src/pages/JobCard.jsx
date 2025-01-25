// Production.js
import React from "react";
import Table from "../components/TableComponent";
import { useNavigate } from "react-router-dom";
const JobCard = () => {
  const navigate = useNavigate(); 
  const handleGenerateJobCard = (record) => {
    console.log('Generating Job Card for:', record);
    navigate("/pdf-generator");
    // Add your logic here, e.g., navigate to another page or trigger a modal.
  };
  const data = [
    {
      key: '1',
      workOrder: 'WO12345',
      dueDate: '2025-01-30',
      client: 'John Brown, New York No. 1 Lake Park',
      status: ['pending'],
    },
    {
      key: '2',
      workOrder: 'WO12346',
      dueDate: '2025-02-15',
      client: 'Jim Green, London No. 1 Lake Park',
      status: ['cancelled'],
    },
    {
      key: '3',
      workOrder: 'WO12347',
      dueDate: '2025-02-10',
      client: 'Joe Black, Sydney No. 1 Lake Park',
      status: ['processing'],
    },
    {
      key: '4',
      workOrder: 'WO12348',
      dueDate: '2025-02-05',
      client: 'Jane Doe, Melbourne No. 2 Lake Park',
      status: ['completed'],
    },
  ];
  return (<Table data={data} handleGenerateJobCard={handleGenerateJobCard}/>);
};

export default JobCard;