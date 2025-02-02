import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  BooleanField,
  DateField,
  MarkdownField,
} from "@refinedev/antd";
import {Typography} from "antd";

const {Title} = Typography;

export const ArticleShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {queryResult} = useShow();
  const {data, isLoading} = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{translate("articles.fields.id")}</Title>
      <NumberField value={record?.id ?? ""}/>
      <Title level={5}>{translate("articles.fields.title")}</Title>
      <TextField value={record?.title}/>
      <Title level={5}>{translate("articles.fields.published")}</Title>
      <BooleanField value={record?.published}/>
      <Title level={5}>{translate("articles.fields.createdAt")}</Title>
      <DateField value={record?.createdAt}/>
      <Title level={5}>{translate("articles.fields.updatedAt")}</Title>
      <DateField value={record?.updatedAt}/>
      <Title level={5}>{translate("articles.fields.content")}</Title>
      <MarkdownField value={record?.content}/>
    </Show>
  );
};
