'use client';

import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { Button } from "antd";
import Link from "next/link";

export default function Login() {
  return (
    <AuthPage
      type="login"
      title={<ThemedTitleV2 collapsed={false} text="Task Tracker" />}
      formProps={{
        initialValues: {
          email: "",
          password: "",
        },
      }}
      registerLink={
        <Link href="/register">
          <Button type="link" size="small">
            Don't have an account? Sign up
          </Button>
        </Link>
      }
      forgotPasswordLink={
        <Link href="/forgot-password">
          <Button type="link" size="small">
            Forgot password?
          </Button>
        </Link>
      }
    />
  );
}
