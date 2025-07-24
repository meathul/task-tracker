"use client";

import React from 'react';
import { Card, Progress, Badge, Typography, Space, Tooltip, Row, Col } from 'antd';
import { TrophyOutlined, FireOutlined, StarOutlined } from '@ant-design/icons';
import { useGamification } from '@/contexts/gamification';

const { Title, Text } = Typography;

export const UserProgressCard: React.FC = () => {
  const { userStats } = useGamification();

  const levelProgress = userStats.experienceToNext > 0 
    ? ((userStats.experience % 100) / 100) * 100 
    : 100;

  return (
    <Card 
      title={
        <Space>
          <TrophyOutlined style={{ color: '#ffd700' }} />
          <span>Your Progress</span>
        </Space>
      }
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      headStyle={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
      bodyStyle={{ color: 'white' }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              {userStats.level}
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Level</Text>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#ffd700', margin: 0 }}>
              {userStats.totalPoints}
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Points</Text>
          </div>
        </Col>
      </Row>
      
      <div style={{ marginTop: '16px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Level {userStats.level}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Level {userStats.level + 1}</Text>
        </Space>
        <Progress
          percent={levelProgress}
          showInfo={false}
          strokeColor={{
            '0%': '#ffd700',
            '100%': '#ffed4e',
          }}
          trailColor="rgba(255,255,255,0.2)"
          style={{ marginTop: '8px' }}
        />
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
          {userStats.experienceToNext} XP to next level
        </Text>
      </div>

      <Row gutter={[16, 8]} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Space>
            <FireOutlined style={{ color: '#ff4d4f' }} />
            <div>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{userStats.streak}</Text>
              <br />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Day Streak</Text>
            </div>
          </Space>
        </Col>
        <Col span={12}>
          <Space>
            <StarOutlined style={{ color: '#ffd700' }} />
            <div>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{userStats.tasksCompleted}</Text>
              <br />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Tasks Done</Text>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export const AchievementsCard: React.FC = () => {
  const { userStats } = useGamification();

  const rarityColors = {
    common: '#52c41a',
    rare: '#1890ff',
    epic: '#722ed1',
    legendary: '#fa8c16',
  };

  const recentAchievements = userStats.achievements
    .sort((a, b) => new Date(b.unlockedAt || '').getTime() - new Date(a.unlockedAt || '').getTime())
    .slice(0, 3);

  return (
    <Card 
      title="Recent Achievements"
      extra={
        <Badge count={userStats.achievements.length} style={{ backgroundColor: '#52c41a' }}>
          <TrophyOutlined style={{ fontSize: '18px', color: '#ffd700' }} />
        </Badge>
      }
    >
      {recentAchievements.length === 0 ? (
        <Text type="secondary">Complete tasks to unlock achievements!</Text>
      ) : (
        <Space direction="vertical" style={{ width: '100%' }}>
          {recentAchievements.map((achievement) => (
            <Tooltip key={achievement.id} title={achievement.description}>
              <div
                style={{
                  padding: '12px',
                  border: `2px solid ${rarityColors[achievement.rarity]}`,
                  borderRadius: '8px',
                  background: `${rarityColors[achievement.rarity]}11`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>{achievement.icon}</span>
                <div style={{ flex: 1 }}>
                  <Text strong style={{ color: rarityColors[achievement.rarity] }}>
                    {achievement.title}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {achievement.description}
                  </Text>
                </div>
                <Badge 
                  color={rarityColors[achievement.rarity]} 
                  text={achievement.rarity.toUpperCase()}
                  style={{ fontSize: '10px' }}
                />
              </div>
            </Tooltip>
          ))}
        </Space>
      )}
    </Card>
  );
};
