import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate, CrudFilters,
} from "@refinedev/core";
import {
  useTable,
  getDefaultSortOrder,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
  DateField,
  MarkdownField,
} from "@refinedev/antd";
import {Table, Space, Row, Col, Form, Input, DatePicker, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;

export const ArticleList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {tableProps, sorter, searchFormProps} = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const {title} = params as any;

      filters.push(
        {
          field: "title",
          operator: "contains",
          value: title,
        }
      );
      return filters;
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Form layout="vertical" {...searchFormProps}>
          <Form.Item label={translate("articles.fields.title")} name="title">
            <Input
              placeholder={translate("articles.fields.title")}
              prefix={<SearchOutlined/>}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column
              dataIndex="id"
              sorter
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
              title={translate("articles.fields.id")}
            />
            <Table.Column
              dataIndex="title"
              sorter
              defaultSortOrder={getDefaultSortOrder("title", sorter)}
              title={translate("articles.fields.title")}
            />
            <Table.Column
              dataIndex={["published"]}
              sorter
              defaultSortOrder={getDefaultSortOrder("published", sorter)}
              title={translate("articles.fields.published")}
              render={(value: any) => <BooleanField value={value}/>}
            />
            <Table.Column
              dataIndex={["createdAt"]}
              title={translate("articles.fields.createdAt")}
              sorter
              defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
              render={(value: any) => <DateField value={value}/>}
            />
            <Table.Column
              dataIndex={["updatedAt"]}
              title={translate("articles.fields.updatedAt")}
              sorter
              defaultSortOrder={getDefaultSortOrder("updatedAt", sorter)}
              render={(value: any) => <DateField value={value} format="LLL"/>}
            />
            <Table.Column
              dataIndex="content"
              title={translate("articles.fields.content")}
              render={(value: any) => (
                <MarkdownField value={value.slice(0, 80) + "..."}/>
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
      </Col>
    </Row>
  );
};
