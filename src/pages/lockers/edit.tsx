import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";

export const LockerEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const lockersData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={translate("lockers.fields.id")}
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.name")}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.location")}
          name={["location"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.booked")}
          valuePropName="checked"
          name={["booked"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Booked</Checkbox>
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.createdAt")}
          name={["createdAt"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime={true}  disabled />
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.updatedAt")}
          name={["updatedAt"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime={true}  disabled/>
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.owner")}
          name={["owner", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("lockers.fields.booker")}
          name={["booker", "id"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
