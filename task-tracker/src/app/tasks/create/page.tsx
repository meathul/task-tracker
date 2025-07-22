'use client';

import { Create } from "@refinedev/antd";
import { Button, Card, Form, Input, Select } from "antd";
import { useForm } from "@refinedev/antd";
import { useGetIdentity, useNotification } from "@refinedev/core";
import { CreateTaskInput } from "@/types/task";
import { useEffect } from "react";
import { supabaseBrowserClient } from "@utils/supabase/client";

export default function TaskCreate() {
  const { data: user } = useGetIdentity<{ id: string }>();
  const { open } = useNotification();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: currentUser } } = await supabaseBrowserClient.auth.getUser();
      console.log('Current authenticated user:', currentUser);
    };
    checkAuth();
  }, []);

  const { form, formProps, saveButtonProps } = useForm<CreateTaskInput>({
    resource: "tasks",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={async (values: any) => {
          const formData: CreateTaskInput = values;
          try {
            if (!user?.id) {
              throw new Error('User not authenticated');
            }

            const taskData = {
              title: formData.title,
              description: formData.description,
              status: formData.status || 'pending',
              user_id: user.id,
            };

            console.log('Creating task with data:', taskData);

            const { data, error } = await supabaseBrowserClient
              .from('tasks')
              .insert([taskData])
              .select()
              .single();

            if (error) throw error;

            open?.({
              type: "success",
              message: "Task created successfully",
            });

            form.resetFields();

          } catch (error) {
            open?.({
              type: "error",
              message: "Failed to create task",
              description: "Please try again",
            });
            console.error('Task creation error:', error);
          }
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea placeholder="Enter task description" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          initialValue="pending"
        >
          <Select
            options={[
              {
                label: "Pending",
                value: "pending",
              },
              {
                label: "In Progress",
                value: "in_progress",
              },
              {
                label: "Completed",
                value: "completed",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
}
