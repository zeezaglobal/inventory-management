import React from 'react';
import { Space, Table, Tag } from 'antd';

const TableComponent = ({ handleGenerateJobCard }) => {
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

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;
