import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button, List, DatePicker } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import "antd/dist/reset.css";

const Diet = () => {
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [calories, setCalories] = useState(0);
  const [mealName, setMealName] = useState("");
  const [data, setData] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get( `${API_BASE_URL}/meals`);
      setMeals(response.data);
      updateChartData(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const addMeal = async () => {
    if (!calories || calories <= 0 || !mealName) return;
    const newMeal = { date: date.format("YYYY-MM-DD"), mealName: mealName, calories: Number(calories) };
    console.log("New Meal:", newMeal); // Debugging
    try {
      const response = await axios.post(`${API_BASE_URL}/meals`, newMeal);
      const updatedMeals = [...meals, response.data];
      setMeals(updatedMeals);
      updateChartData(updatedMeals);
      setCalories(0);
      setMealName("");
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`/api/meals/${id}`);
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      setMeals(updatedMeals);
      updateChartData(updatedMeals);
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const updateChartData = (meals) => {
    const groupedData = meals.reduce((acc, meal) => {
      acc[meal.date] = (acc[meal.date] || 0) + meal.calories;
      return acc;
    }, {});
    setData(Object.entries(groupedData).map(([date, calories]) => ({ date, calories })));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card title="Daily Calorie Tracker">
        <DatePicker value={date} onChange={setDate} />
        <Input placeholder="Meal name (e.g. Burger)" value={mealName} onChange={(e) => setMealName(e.target.value)} style={{ marginTop: "10px" }} />
        <Input type="number" placeholder="Enter calories" value={calories} onChange={(e) => setCalories(e.target.value)} style={{ marginTop: "10px" }} />
        <Button onClick={addMeal} type="primary" style={{ marginTop: "10px" }}>Add Meal</Button>
        <List 
          dataSource={meals} 
          renderItem={(item) => (
            <List.Item>
              {`${item.date}: ${item.mealName} - ${item.calories} kcal`}
              <Button type="link" danger onClick={() => deleteMeal(item.id)}>Delete</Button>
            </List.Item>
          )} 
        />
      </Card>

      <Card title="Calorie Intake Over Time" style={{ marginTop: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Diet;
