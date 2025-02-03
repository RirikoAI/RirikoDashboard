import React from "react";
import { Row, Col, Card, Typography } from "antd";
import './style.css';

const {Text} = Typography;
import '../../components/Card/styles.css';
import { ServerList } from "../../components/Servers/ServerList";

export const DashboardPage: React.FC = () => {
  return (
    <>
      <ServerList />
    </>
  );
};