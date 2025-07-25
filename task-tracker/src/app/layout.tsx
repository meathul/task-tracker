import { ErrorComponent, notificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { App as AntdApp, Layout } from "antd";
import { Header } from "@components/header";
import { ThemedLayout, ThemedMain } from "@components/themed-layout";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { GamificationProvider } from "@contexts/gamification";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider } from "@providers/data-provider";
import "@refinedev/antd/dist/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "A Multi-User Task Management Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en" className={defaultMode}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <RefineKbarProvider>
            <AntdRegistry>
              <ColorModeContextProvider defaultMode={defaultMode}>
                <GamificationProvider>
                  <AntdApp>
                  <Refine
                    routerProvider={routerProvider}
                    authProvider={authProviderClient}
                    dataProvider={dataProvider}
                    notificationProvider={notificationProvider}
                    catchAll={<ErrorComponent />}
                    resources={[
                      {
                        name: "dashboard",
                        list: "/dashboard",
                        meta: {
                          label: "Dashboard",
                          icon: "📊",
                          auth: {
                            required: true,
                            redirectTo: "/login",
                          },
                        },
                      },
                      {
                        name: "tasks",
                        list: "/tasks",
                        create: "/tasks/create",
                        edit: "/tasks/edit/:id",
                        meta: {
                          canDelete: true,
                          auth: {
                            required: true,
                            redirectTo: "/login",
                          },
                        },
                      }
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "task-tracker",
                    }}
                  >
                    <ThemedLayout>
                      <Header />
                      <ThemedMain>
                        {children}
                      </ThemedMain>
                    </ThemedLayout>
                    <RefineKbar />
                  </Refine>
                </AntdApp>
              </GamificationProvider>
            </ColorModeContextProvider>
          </AntdRegistry>
        </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
