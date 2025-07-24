"use client";

import { theme } from "antd";
import React from "react";

const { useToken } = theme;

interface ThemedLayoutProps {
  children: React.ReactNode;
}

export const ThemedLayout: React.FC<ThemedLayoutProps> = ({ children }) => {
  const { token } = useToken();

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: token.colorBgBase
      }}
    >
      {children}
    </div>
  );
};

interface ThemedMainProps {
  children: React.ReactNode;
}

export const ThemedMain: React.FC<ThemedMainProps> = ({ children }) => {
  const { token } = useToken();

  return (
    <main 
      style={{ 
        flex: 1,
        padding: '24px',
        backgroundColor: token.colorBgContainer
      }}
    >
      {children}
    </main>
  );
};
