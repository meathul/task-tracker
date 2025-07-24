"use client";

import { ColorModeContext } from "@contexts/color-mode";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Space,
  Switch,
  theme,
  Typography,
  Button,
  Menu,
  Dropdown,
} from "antd";
import { 
  LogoutOutlined, 
  CheckSquareOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined 
} from "@ant-design/icons";
import React, { useContext } from "react";
import { useLogout, useGo } from "@refinedev/core";

const { Text, Title } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);
  const { mutate: logout } = useLogout();
  const go = useGo();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1000;
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => {
        // Add profile navigation logic here
        console.log('Navigate to profile');
      },
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => {
        // Add settings navigation logic here
        console.log('Navigate to settings');
      },
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: () => logout(),
    },
  ];

  return (
    <AntdLayout.Header style={headerStyles}>
      {/* Left side - Logo and Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            cursor: 'pointer'
          }}
          onClick={() => go({ to: '/tasks' })}
        >
          <CheckSquareOutlined 
            style={{ 
              fontSize: '24px', 
              color: token.colorPrimary 
            }} 
          />
          <Title 
            level={4} 
            style={{ 
              margin: 0, 
              color: token.colorText,
              fontWeight: 600
            }}
          >
            Task Tracker
          </Title>
        </div>
        
        <nav>
          <Space size="large">
            <Button 
              type="text" 
              icon={<DashboardOutlined />}
              onClick={() => go({ to: '/dashboard' })}
              style={{ 
                color: token.colorText,
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Dashboard
            </Button>
            <Button 
              type="text" 
              icon={<CheckSquareOutlined />}
              onClick={() => go({ to: '/tasks' })}
              style={{ 
                color: token.colorText,
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Tasks
            </Button>
          </Space>
        </nav>
      </div>

      {/* Right side - Theme toggle and User info */}
      <Space align="center" size="large">
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          checked={mode === "dark"}
          style={{ backgroundColor: mode === "dark" ? token.colorPrimary : undefined }}
        />
        
        {user && (
          <Dropdown 
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = token.colorBgTextHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            >
              {user.name && (
                <Text strong style={{ color: token.colorText }}>
                  {user.name}
                </Text>
              )}
              <Avatar 
                src={user.avatar} 
                icon={<UserOutlined />}
                size={32}
                style={{ 
                  backgroundColor: user.avatar ? undefined : token.colorPrimary 
                }}
              />
            </div>
          </Dropdown>
        )}
        
        {!user && (
          <Button 
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => logout()}
            style={{ 
              color: token.colorText,
              height: '40px'
            }}
          >
            Sign Out
          </Button>
        )}
      </Space>
    </AntdLayout.Header>
  );
};
