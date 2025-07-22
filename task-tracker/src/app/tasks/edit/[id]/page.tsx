'use client';

import { Edit } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useForm } from "@refinedev/antd";
import { Task, UpdateTaskInput } from "@/types/task";

export default function TaskEdit() {
  const { formProps, saveButtonProps } = useForm<Task>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
}
