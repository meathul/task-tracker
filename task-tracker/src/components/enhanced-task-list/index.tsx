'use client';

import React, { useState } from 'react';
import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { 
  Table, 
  Space, 
  Tag, 
  Input, 
  Select, 
  DatePicker, 
  Card, 
  Row, 
  Col,
  Badge,
  Tooltip,
  Button
} from "antd";
import { 
  SearchOutlined, 
  FilterOutlined, 
  CalendarOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import { Task, TaskStatus, TaskPriority, TaskCategory } from "@/types/task";
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;

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

const getPriorityColor = (priority?: TaskPriority) => {
  switch (priority) {
    case 'urgent':
      return 'red';
    case 'high':
      return 'volcano';
    case 'medium':
      return 'gold';
    case 'low':
      return 'green';
    default:
      return 'default';
  }
};

const getCategoryColor = (category?: TaskCategory) => {
  switch (category) {
    case 'work':
      return 'blue';
    case 'personal':
      return 'purple';
    case 'shopping':
      return 'cyan';
    case 'health':
      return 'green';
    case 'education':
      return 'geekblue';
    default:
      return 'default';
  }
};

const isOverdue = (dueDate?: string) => {
  if (!dueDate) return false;
  return dayjs(dueDate).isBefore(dayjs(), 'day');
};

const isDueSoon = (dueDate?: string) => {
  if (!dueDate) return false;
  const daysDiff = dayjs(dueDate).diff(dayjs(), 'day');
  return daysDiff >= 0 && daysDiff <= 2;
};

export default function EnhancedTaskList() {
  const [showFilters, setShowFilters] = useState(false);
  
  const { tableProps, searchFormProps, filters, setFilters } = useTable<Task>({
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
      render: (title: string, record: Task) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              textDecoration: record.status === 'completed' ? 'line-through' : 'none',
              opacity: record.status === 'completed' ? 0.7 : 1,
            }}
          >
            {title}
          </span>
          {isOverdue(record.due_date) && (
            <Tooltip title="Overdue">
              <ExclamationCircleOutlined style={{ color: 'red' }} />
            </Tooltip>
          )}
          {isDueSoon(record.due_date) && !isOverdue(record.due_date) && (
            <Tooltip title="Due Soon">
              <ClockCircleOutlined style={{ color: 'orange' }} />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (description: string, record: Task) => (
        <span
          style={{
            textDecoration: record.status === 'completed' ? 'line-through' : 'none',
            opacity: record.status === 'completed' ? 0.7 : 1,
          }}
        >
          {description}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
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
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority?: TaskPriority) => (
        priority ? (
          <Tag color={getPriorityColor(priority)}>
            {priority.toUpperCase()}
          </Tag>
        ) : null
      ),
      filters: [
        { text: 'Urgent', value: 'urgent' },
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (category?: TaskCategory) => (
        category ? (
          <Tag color={getCategoryColor(category)}>
            {category.toUpperCase()}
          </Tag>
        ) : null
      ),
      filters: [
        { text: 'Work', value: 'work' },
        { text: 'Personal', value: 'personal' },
        { text: 'Shopping', value: 'shopping' },
        { text: 'Health', value: 'health' },
        { text: 'Education', value: 'education' },
        { text: 'Other', value: 'other' },
      ],
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      width: 120,
      render: (date?: string) => {
        if (!date) return null;
        const isOver = isOverdue(date);
        const isSoon = isDueSoon(date);
        
        return (
          <span style={{ 
            color: isOver ? 'red' : isSoon ? 'orange' : 'inherit',
            fontWeight: isOver || isSoon ? 'bold' : 'normal'
          }}>
            {dayjs(date).format('MMM DD')}
          </span>
        );
      },
      sorter: true,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (date: string) => dayjs(date).format('MMM DD'),
      sorter: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 100,
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
    <List
      headerButtons={[
        <Button
          key="filter"
          icon={<FilterOutlined />}
          onClick={() => setShowFilters(!showFilters)}
          type={showFilters ? "primary" : "default"}
        >
          Filters
        </Button>
      ]}
    >
      {showFilters && (
        <Card style={{ marginBottom: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Search
                placeholder="Search tasks..."
                allowClear
                onSearch={(value) => {
                  // Implement search logic
                }}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="Status"
                allowClear
                style={{ width: '100%' }}
                onChange={(value) => {
                  // Implement status filter
                }}
              >
                <Option value="pending">Pending</Option>
                <Option value="in_progress">In Progress</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="Priority"
                allowClear
                style={{ width: '100%' }}
                onChange={(value) => {
                  // Implement priority filter
                }}
              >
                <Option value="urgent">Urgent</Option>
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="Category"
                allowClear
                style={{ width: '100%' }}
                onChange={(value) => {
                  // Implement category filter
                }}
              >
                <Option value="work">Work</Option>
                <Option value="personal">Personal</Option>
                <Option value="shopping">Shopping</Option>
                <Option value="health">Health</Option>
                <Option value="education">Education</Option>
                <Option value="other">Other</Option>
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <DatePicker
                placeholder="Due date"
                style={{ width: '100%' }}
                onChange={(date) => {
                  // Implement due date filter
                }}
              />
            </Col>
          </Row>
        </Card>
      )}
      
      <Table 
        {...tableProps} 
        columns={columns} 
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
          pageSize: 10,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} tasks`,
        }}
        scroll={{ x: 1200 }}
      />
    </List>
  );
}
