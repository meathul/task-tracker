'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Progress, List, Typography, Button, Space, Badge, Modal, Calendar, Tooltip } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  PlayCircleOutlined,
  PlusOutlined,
  TrophyOutlined,
  FireOutlined,
  StarOutlined,
  RocketOutlined,
  CalendarOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useList, useGo } from '@refinedev/core';
import { Task } from '@/types/task';
import { useGamification } from '@/contexts/gamification';
import { UserProgressCard, AchievementsCard } from '@/components/gamification/progress-cards';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export default function Dashboard() {
  const go = useGo();
  const { userStats } = useGamification();
  const [streakModalVisible, setStreakModalVisible] = useState(false);
  
  const { data: tasks, isLoading } = useList<Task>({
    resource: 'tasks',
  });

  const taskData = tasks?.data || [];
  
  const stats = {
    total: taskData.length,
    completed: taskData.filter(task => task.status === 'completed').length,
    inProgress: taskData.filter(task => task.status === 'in_progress').length,
    pending: taskData.filter(task => task.status === 'pending').length,
  };

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const recentTasks = taskData.slice(0, 3);

  // Generate streak calendar data
  const generateStreakData = () => {
    const today = dayjs();
    const streakDays = [];
    
    for (let i = userStats.streak - 1; i >= 0; i--) {
      streakDays.push(today.subtract(i, 'day').format('YYYY-MM-DD'));
    }
    
    return streakDays;
  };

  const streakDays = generateStreakData();

  const getStreakMessage = () => {
    if (userStats.streak === 0) {
      return "Start your streak by completing a task today! 🚀";
    } else if (userStats.streak === 1) {
      return "Great start! Keep it going tomorrow! 💪";
    } else if (userStats.streak < 7) {
      return `Amazing! You're on fire! ${7 - userStats.streak} more days to reach a week! 🔥`;
    } else if (userStats.streak < 30) {
      return `Incredible consistency! ${30 - userStats.streak} more days to reach a month! ⚡`;
    } else {
      return "You're a productivity legend! 🏆";
    }
  };

  const dateCellRender = (date: dayjs.Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    const isStreakDay = streakDays.includes(dateStr);
    const isToday = date.isSame(dayjs(), 'day');
    
    if (isStreakDay) {
      return (
        <div style={{ 
          background: isToday ? 'linear-gradient(45deg, #ff4d4f, #ff7875)' : 'linear-gradient(45deg, #52c41a, #73d13d)',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          🔥
        </div>
      );
    }
    
    return null;
  };

  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      <div style={{ 
        marginBottom: '24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>🎮 Dashboard</Title>
          <Text type="secondary">Level {userStats.level} Task Master</Text>
        </div>
        <Space>
          <Tooltip title="Click to view streak details">
            <Badge count={userStats.streak} style={{ backgroundColor: '#ff4d4f' }}>
              <Button 
                icon={<FireOutlined />}
                onClick={() => setStreakModalVisible(true)}
                style={{ 
                  background: userStats.streak > 0 ? 'linear-gradient(45deg, #ff4d4f, #ff7875)' : undefined,
                  color: userStats.streak > 0 ? 'white' : undefined,
                  border: userStats.streak > 0 ? 'none' : undefined
                }}
              >
                Streak
              </Button>
            </Badge>
          </Tooltip>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => go({ to: '/tasks/create' })}
            size="large"
          >
            Quick Add Task
          </Button>
        </Space>
      </div>

      {/* Gamification Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <UserProgressCard />
        </Col>
        <Col xs={24} lg={12}>
          <AchievementsCard />
        </Col>
      </Row>

      {/* Task Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={stats.total}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <Badge 
                  count={`+${Math.floor(stats.total * 15)} XP`} 
                  style={{ backgroundColor: '#52c41a', fontSize: '10px' }}
                />
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card style={{ background: 'linear-gradient(45deg, #52c41a, #73d13d)' }}>
            <Statistic
              title="Completed"
              value={stats.completed}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: 'white' }}
              suffix={
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>
                  🏆 Achievement Progress
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={stats.inProgress}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <Badge 
                  count="Active" 
                  style={{ backgroundColor: '#1890ff', fontSize: '10px' }}
                />
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="Pending"
              value={stats.pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix={
                stats.pending > 0 ? (
                  <Badge 
                    count="Waiting" 
                    style={{ backgroundColor: '#faad14', fontSize: '10px' }}
                  />
                ) : (
                  <Badge 
                    count="🎉 All Done!" 
                    style={{ backgroundColor: '#52c41a', fontSize: '10px' }}
                  />
                )
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <RocketOutlined style={{ color: '#1890ff' }} />
                <span>Completion Progress</span>
                <Badge 
                  count={`${Math.round(completionRate)}%`} 
                  style={{ backgroundColor: completionRate === 100 ? '#52c41a' : '#1890ff' }}
                />
              </Space>
            }
            style={{ height: '350px', overflow: 'hidden' }}
          >
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '250px'
            }}>
              <Progress
                type="circle"
                percent={Math.round(completionRate)}
                size={100}
                strokeColor={{
                  '0%': '#108ee9',
                  '50%': '#1890ff',
                  '100%': '#52c41a',
                }}
                format={(percent) => (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{percent}%</div>
                    {percent === 100 && <div style={{ fontSize: '12px' }}>🎉</div>}
                  </div>
                )}
              />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Text strong>Overall Completion Rate</Text>
                {completionRate === 100 && (
                  <div style={{ marginTop: '8px' }}>
                    <Badge 
                      count="Perfect Score!" 
                      style={{ backgroundColor: '#52c41a' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <StarOutlined style={{ color: '#ffd700' }} />
                <span>Recent Tasks</span>
                <Badge 
                  count={`${recentTasks.length} latest`} 
                  style={{ backgroundColor: '#722ed1' }}
                />
              </Space>
            }
            style={{ height: '350px' }}
            extra={
              <Button 
                type="link" 
                onClick={() => go({ to: '/tasks' })}
                size="small"
              >
                View All
              </Button>
            }
            bodyStyle={{ 
              height: '280px', 
              overflow: 'auto',
              padding: '16px'
            }}
          >
            <List
              dataSource={recentTasks}
              loading={isLoading}
              size="small"
              renderItem={(task, index) => (
                <List.Item style={{ padding: '8px 0' }}>
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        count={index + 1} 
                        style={{ 
                          backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                          color: 'white'
                        }}
                      />
                    }
                    title={
                      <div style={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {task.status === 'completed' && '✅ '}
                        {task.status === 'in_progress' && '🔄 '}
                        {task.status === 'pending' && '⏳ '}
                        {task.title}
                      </div>
                    }
                    description={
                      <div>
                        <Text 
                          type="secondary" 
                          style={{ 
                            fontSize: '12px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block'
                          }}
                        >
                          {task.description}
                        </Text>
                        <Space style={{ marginTop: '4px' }}>
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            {new Date(task.created_at).toLocaleDateString()}
                          </Text>
                          {task.status === 'completed' && (
                            <Badge 
                              count="🎉 XP Earned!" 
                              style={{ backgroundColor: '#52c41a', fontSize: '9px' }}
                            />
                          )}
                        </Space>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Streak Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FireOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
            <span>Streak Details</span>
          </div>
        }
        open={streakModalVisible}
        onCancel={() => setStreakModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setStreakModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        <div style={{ padding: '16px 0' }}>
          {/* Streak Stats */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={8}>
              <Card style={{ textAlign: 'center', background: 'linear-gradient(45deg, #ff4d4f, #ff7875)' }}>
                <Statistic
                  title={<span style={{ color: 'white' }}>Current Streak</span>}
                  value={userStats.streak}
                  valueStyle={{ color: 'white', fontSize: '32px' }}
                  suffix={<span style={{ color: 'white' }}>🔥</span>}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ textAlign: 'center', background: 'linear-gradient(45deg, #ffd700, #ffec3d)' }}>
                <Statistic
                  title={<span style={{ color: '#000' }}>Best Streak</span>}
                  value={userStats.longestStreak}
                  valueStyle={{ color: '#000', fontSize: '32px' }}
                  suffix={<span>🏆</span>}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ textAlign: 'center', background: 'linear-gradient(45deg, #52c41a, #73d13d)' }}>
                <Statistic
                  title={<span style={{ color: 'white' }}>Total Tasks</span>}
                  value={userStats.tasksCompleted}
                  valueStyle={{ color: 'white', fontSize: '32px' }}
                  suffix={<span style={{ color: 'white' }}>✅</span>}
                />
              </Card>
            </Col>
          </Row>

          {/* Motivational Message */}
          <Card style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
              <InfoCircleOutlined style={{ marginRight: '8px' }} />
              {getStreakMessage()}
            </div>
          </Card>

          {/* Streak Calendar */}
          {userStats.streak > 0 && (
            <div>
              <Title level={4} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined />
                Streak Calendar
              </Title>
              <Text type="secondary" style={{ marginBottom: '16px', display: 'block' }}>
                🔥 marks show your streak days. Keep the fire burning!
              </Text>
              <Calendar
                fullscreen={false}
                dateCellRender={dateCellRender}
                headerRender={() => null}
                style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px'
                }}
              />
            </div>
          )}

          {/* Streak Milestones */}
          <div style={{ marginTop: '24px' }}>
            <Title level={4}>🎯 Streak Milestones</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              {[
                { days: 3, emoji: '🎯', title: 'Getting Started', achieved: userStats.streak >= 3 },
                { days: 7, emoji: '🔥', title: 'Week Warrior', achieved: userStats.streak >= 7 },
                { days: 14, emoji: '⚡', title: 'Two Week Champion', achieved: userStats.streak >= 14 },
                { days: 30, emoji: '👑', title: 'Monthly Master', achieved: userStats.streak >= 30 },
                { days: 60, emoji: '🏆', title: 'Consistency King', achieved: userStats.streak >= 60 },
                { days: 100, emoji: '💎', title: 'Diamond Dedication', achieved: userStats.streak >= 100 },
              ].map((milestone) => (
                <Card 
                  key={milestone.days}
                  size="small"
                  style={{ 
                    opacity: milestone.achieved ? 1 : 0.5,
                    background: milestone.achieved ? 'linear-gradient(45deg, #52c41a11, #52c41a22)' : undefined,
                    border: milestone.achieved ? '1px solid #52c41a' : undefined
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{milestone.emoji}</span>
                      <div>
                        <Text strong>{milestone.title}</Text>
                        <br />
                        <Text type="secondary">{milestone.days} day streak</Text>
                      </div>
                    </div>
                    {milestone.achieved ? (
                      <Badge count="✅" style={{ backgroundColor: '#52c41a' }} />
                    ) : (
                      <Badge count={`${milestone.days - userStats.streak} to go`} style={{ backgroundColor: '#faad14' }} />
                    )}
                  </div>
                </Card>
              ))}
            </Space>
          </div>
        </div>
      </Modal>
    </div>
  );
}
