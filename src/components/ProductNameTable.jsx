import React from "react";
import { Table, Input, Button, Popconfirm } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const EditableCell = ({ value: initialValue, onChange }) => {
  const [value, setValue] = React.useState(initialValue);
  const [editable, setEditable] = React.useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const check = () => {
    setEditable(false);
    if (onChange) {
      onChange(value);
    }
  };

  const edit = () => {
    setEditable(true);
  };

  return (
    <div className="editable-cell">
      {editable ? (
        <div className="editable-cell-input-wrapper">
          <Input value={value} onChange={handleChange} onPressEnter={check} />
          <CheckOutlined className="editable-cell-icon-check" onClick={check} />
        </div>
      ) : (
        <div className="editable-cell-text-wrapper">
          {value || " "}
          <EditOutlined className="editable-cell-icon" onClick={edit} />
        </div>
      )}
    </div>
  );
};

const ProductNameTable = ({ dataSource, onDelete }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      render: (text, record) => <EditableCell value={text} />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "type",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) =>
        dataSource.length > 0 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.key)}
          >
            <a href="#">Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div>
      <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProductNameTable;
