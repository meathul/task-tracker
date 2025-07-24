'use client';

import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Badge, Tooltip, Button, Dropdown, notification } from "antd";
import { StarOutlined, TrophyOutlined, FireOutlined, CaretDownOutlined, CheckOutlined, ClockCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import { Task, TaskStatus } from "@/types/task";
import { useTaskCompletion } from "@/hooks/useTaskCompletion";
import { useGamification } from "@/contexts/gamification";
import { useUpdate } from "@refinedev/core";

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
  const { getTaskPoints, handleTaskComplete } = useTaskCompletion();
  const { userStats } = useGamification();
  const { mutate: updateTask } = useUpdate();
  
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

  const handleStatusChange = (taskId: string, newStatus: TaskStatus, task: Task) => {
    updateTask({
      resource: 'tasks',
      id: taskId,
      values: { status: newStatus },
    }, {
      onSuccess: () => {
        if (newStatus === 'completed' && task.status !== 'completed') {
          // Trigger gamification rewards
          handleTaskComplete(task);
        }
        
        notification.success({
          message: 'Status Updated!',
          description: `Task moved to ${newStatus.replace('_', ' ')}`,
          duration: 2,
        });
      },
      onError: (error) => {
        notification.error({
          message: 'Update Failed',
          description: 'Could not update task status',
          duration: 3,
        });
      }
    });
  };

  const getStatusMenuItems = (record: Task) => {
    const statuses: { key: TaskStatus; label: string; icon: React.ReactNode; color: string }[] = [
      { key: 'pending', label: 'Pending', icon: <ClockCircleOutlined />, color: '#faad14' },
      { key: 'in_progress', label: 'In Progress', icon: <PlayCircleOutlined />, color: '#1890ff' },
      { key: 'completed', label: 'Completed', icon: <CheckOutlined />, color: '#52c41a' },
    ];

    return statuses
      .filter(status => status.key !== record.status)
      .map(status => ({
        key: status.key,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: status.color }}>{status.icon}</span>
            <span>{status.label}</span>
            {status.key === 'completed' && (
              <Badge 
                count={`+${getTaskPoints(record.priority)}pts`} 
                style={{ backgroundColor: '#52c41a', fontSize: '10px' }}
              />
            )}
          </div>
        ),
        onClick: () => handleStatusChange(record.id, status.key, record),
      }));
  };

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
          {record.status === 'completed' && <TrophyOutlined style={{ color: '#ffd700' }} />}
          <Tooltip title={`Worth ${getTaskPoints(record.priority)} points`}>
            <Badge 
              count={`${getTaskPoints(record.priority)}pts`} 
              style={{ 
                backgroundColor: record.status === 'completed' ? '#52c41a' : '#1890ff',
                fontSize: '10px'
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
      width: 140,
      render: (status: TaskStatus, record: Task) => (
        <Dropdown
          menu={{ items: getStatusMenuItems(record) }}
          trigger={['click']}
          placement="bottomLeft"
        >
          <Button
            style={{
              border: `1px solid ${getStatusColor(status)}`,
              backgroundColor: `${getStatusColor(status)}11`,
              color: getStatusColor(status),
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
            size="small"
          >
            {status === 'pending' && <ClockCircleOutlined />}
            {status === 'in_progress' && <PlayCircleOutlined />}
            {status === 'completed' && <CheckOutlined />}
            <span>{status.replace('_', ' ').toUpperCase()}</span>
            <CaretDownOutlined style={{ fontSize: '10px' }} />
          </Button>
        </Dropdown>
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
      width: 120,
      render: (_, record) => (
        <Space>
          {record.status !== 'completed' && (
            <Tooltip title={`Quick Complete (+${getTaskPoints(record.priority)} pts)`}>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleStatusChange(record.id, 'completed', record)}
                style={{
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a',
                }}
              />
            </Tooltip>
          )}
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
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>🎮 Task Quest</span>
          <Badge count={`Level ${userStats.level}`} style={{ backgroundColor: '#722ed1' }} />
          <Badge count={`${userStats.totalPoints} pts`} style={{ backgroundColor: '#ffd700', color: '#000' }} />
          {userStats.streak > 0 && (
            <Badge count={`${userStats.streak} 🔥`} style={{ backgroundColor: '#ff4d4f' }} />
          )}
        </div>
      }
    >
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
