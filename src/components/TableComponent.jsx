import React from 'react';
import { Space, Table, Tag } from 'antd';

const TableComponent = ({ data, handleGenerateJobCard }) => {
  const columns = [
    {
      title: 'Work Order',
      dataIndex: 'workOrder',
      key: 'workOrder',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((statusItem) => {
            let color;
            switch (statusItem) {
              case 'pending':
                color = 'gold';
                break;
              case 'processing':
                color = 'blue';
                break;
              case 'cancelled':
                color = 'red';
                break;
              case 'completed':
                color = 'green';
                break;
              default:
                color = 'default';
                break;
            }
            return (
              <Tag color={color} key={statusItem}>
                {statusItem.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status.includes('completed') ? null : (
            <a onClick={() => handleGenerateJobCard(record)}>Generate Job Card</a>
          )}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;
