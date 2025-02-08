import React from "react";
import { Row, Col, Card, Typography, Statistic } from "antd";
import { useDiscordServer } from "../../contexts/discord";
import { PlayCircleOutlined } from "@ant-design/icons";
import { LuUsers } from "react-icons/lu";
import { FaCircle } from "react-icons/fa";

const {Text} = Typography;

export const DashboardPage: React.FC = () => {
  const { selectedServer } = useDiscordServer();
  console.log(selectedServer)
  return (
    <>
      <h1>Dashboard for {selectedServer.name}</h1>
      <Row gutter={16}>
        <Col xl={4} lg={8}  md={12} sm={24} style={{ marginBottom: 16 }}>
          <Card bordered={false}>
            <Statistic
              title="Members"
              value={selectedServer.approximate_member_count}
              prefix={<LuUsers  />}
            />
          </Card>
        </Col>
        <Col xl={4} lg={8} md={12} sm={24} style={{ marginBottom: 16 }}>
          <Card bordered={false}>
            <Statistic
              title="Currently Online"
              value={selectedServer.approximate_presence_count}
              prefix={<FaCircle  />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};