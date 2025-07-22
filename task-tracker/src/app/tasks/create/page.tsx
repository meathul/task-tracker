'use client';

import { Create } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useForm } from "@refinedev/antd";
import { CreateTaskInput, TaskStatus } from "@/types/task";

export default function TaskCreate() {
  const { formProps, saveButtonProps } = useForm<CreateTaskInput>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea />
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
