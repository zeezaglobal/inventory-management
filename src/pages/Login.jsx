import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Form, Input, message, Alert } from "antd";
const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { username, password } = values;
    console.log("Login attempt with:", username, password);

    // Simulating authentication
    if (username === "admin" && password === "admin12") {
      message.success("Login successful!");
      navigate("/dashboard"); // Navigate to the dashboard or desired route after successful login
    } else {
     
      setError("Invalid username or password!");
    }
  };


  return (
    <div style={{ width: 300, margin: "100px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      {error && <Alert message={error} type="error" showIcon />}
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
         
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
