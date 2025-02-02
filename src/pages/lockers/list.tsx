import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
  DateField,
} from "@refinedev/antd";
import {Table, Space} from "antd";

export const LockerList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {tableProps} = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title={translate("lockers.fields.id")}
        />
        <Table.Column
          dataIndex="name"
          title={translate("lockers.fields.name")}
        />
        <Table.Column
          dataIndex="location"
          title={translate("lockers.fields.location")}
        />
        <Table.Column
          dataIndex={["booked"]}
          title={translate("lockers.fields.booked")}
          render={(value: any) => <BooleanField value={value}/>}
        />
        <Table.Column
          dataIndex={["createdAt"]}
          title={translate("lockers.fields.createdAt")}
          render={(value: any) => <DateField value={value}/>}
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title={translate("lockers.fields.updatedAt")}
          render={(value: any) => <DateField value={value}/>}
        />
        <Table.Column
          dataIndex="owner"
          title={translate("lockers.fields.owner")}
          render={(value: any) => (
            <>{value?.firstName + " " + value?.lastName}</>
          )}
        />
        <Table.Column
          dataIndex="booker"
          title={translate("lockers.fields.booker")}
          render={(value: any) => (
            <>{(value?.firstName ? value?.firstName : 'N/A') + " " + (value?.lastName ? value?.lastName : '')}</>
          )}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
