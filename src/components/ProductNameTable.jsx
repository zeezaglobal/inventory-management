import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

const EditableCell = ({ value: initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [editable, setEditable] = useState(false);

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
          <Input
            value={value}
            onChange={handleChange}
            onPressEnter={check}
          />
          <CheckOutlined
            className="editable-cell-icon-check"
            onClick={check}
          />
        </div>
      ) : (
        <div className="editable-cell-text-wrapper">
          {value || ' '}
          <EditOutlined
            className="editable-cell-icon"
            onClick={edit}
          />
        </div>
      )}
    </div>
  );
};

const ProductNameTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);

  const [count, setCount] = useState(2);

  const onCellChange = (key, dataIndex) => (value) => {
    const newData = [...dataSource];
    const target = newData.find((item) => item.key === key);
    if (target) {
      target[dataIndex] = value;
      setDataSource(newData);
    }
  };

  const onDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count.toString(),
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={onCellChange(record.key, 'name')}
        />
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) =>
        dataSource.length > 1 ? (
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
      <Button
        type="primary"
        className="editable-add-btn"
        onClick={handleAdd}
        style={{ marginTop: 12,marginBottom:12 }}
      >
        Add
      </Button>
      <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProductNameTable;
