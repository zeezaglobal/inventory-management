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
  return (<Table handleGenerateJobCard={handleGenerateJobCard}/>);
};

export default JobCard;