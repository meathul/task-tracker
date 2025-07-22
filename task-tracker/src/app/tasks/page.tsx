'use client';

import { List, useTable, EditButton, DeleteButton, CreateButton, ShowButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Task, TaskStatus } from "@/types/task";

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'in_progress':
      return 'blue';
    case 'completed':
      return 'green';
    default:
      return 'default';
  }
};

export default function TaskList() {
  const { tableProps, searchFormProps } = useTable<Task>({
    syncWithLocation: true,
    filters: {
      initial: [
        {
          field: 'status',
          operator: 'eq',
          value: undefined,
        },
      ],
      defaultBehavior: 'replace',
    },
    sorters: {
      initial: [
        {
          field: 'created_at',
          order: 'desc',
        },
      ],
    },
    onSearch: (values) => {
      const { q } = values as { q?: string };
      return [{
        field: 'title',
        operator: 'contains',
        value: q,
      }];
    },
  });

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: TaskStatus) => (
        <Tag color={getStatusColor(status)}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Completed', value: 'completed' },
      ],
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Space>
          <EditButton 
            hideText 
            size="small" 
            recordItemId={record.id}
          />
          <DeleteButton 
            hideText 
            size="small" 
            recordItemId={record.id}
          />
        </Space>
      ),
    },
  ];

  return (
    <List>
      <div style={{ marginBottom: 16 }}>
        <CreateButton 
          resource="tasks"
          // Remove any replace prop and other unnecessary props
        />
      </div>
      <Table 
        {...tableProps} 
        columns={columns} 
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
          pageSize: 10
        }}
      />
    </List>
  );
}
