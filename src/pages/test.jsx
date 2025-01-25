import React, { useState } from 'react';
import axios from 'axios';

const WorkOrderForm = () => {
  const [workOrder, setWorkOrder] = useState({
    workOrderNumber: '',
    dueDate: '',
    products: [
      { name: '', price: '', quantity: '' }
    ]
  });

  const handleWorkOrderChange = (e) => {
    const { name, value } = e.target;
    setWorkOrder({
      ...workOrder,
      [name]: value
    });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...workOrder.products];
    updatedProducts[index][name] = value;
    setWorkOrder({
      ...workOrder,
      products: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setWorkOrder({
      ...workOrder,
      products: [...workOrder.products, { name: '', price: '', quantity: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/workorders', workOrder);
      console.log('Work order created successfully:', response.data);
      alert('Work order created!');
    } catch (error) {
      console.error('Error creating work order:', error);
      alert('Error creating work order');
    }
  };

  return (
    <div>
      <h2>Create Work Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Work Order Number:</label>
          <input
            type="text"
            name="workOrderNumber"
            value={workOrder.workOrderNumber}
            onChange={handleWorkOrderChange}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={workOrder.dueDate}
            onChange={handleWorkOrderChange}
          />
        </div>

        <h3>Products</h3>
        {workOrder.products.map((product, index) => (
          <div key={index}>
            <div>
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={handleAddProduct}>Add Another Product</button>
        <div>
          <button type="submit">Submit Work Order</button>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderForm;
