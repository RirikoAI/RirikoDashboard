import React from "react";
import { Row, Col, Card, Typography, Statistic } from "antd";
import { useDiscordServer } from "../../contexts/discord-server";
import { PlayCircleOutlined } from "@ant-design/icons";
import { LuUsers } from "react-icons/lu";
import { FaCircle } from "react-icons/fa";
import { GuildFeature } from "../../components/GuildFeature";

const {Text} = Typography;

export const DashboardPage: React.FC = () => {
  const {selectedServer} = useDiscordServer();
  return (
    <>
      <h1>Dashboard for { selectedServer.name }</h1>
      <Row gutter={ 24 } style={ {marginBottom: 16} }>
        <Col xl={ 6 } lg={ 12 } md={ 24 } sm={ 24 } style={ {marginBottom: 16} }>
          <Card>
            <Statistic
              title="Members"
              value={ selectedServer.approximate_member_count }
              prefix={ <LuUsers/> }
            />
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 24 } sm={ 24 } style={ {marginBottom: 16} }>
          <Card>
            <Statistic
              title="Currently Online"
              value={ selectedServer.approximate_presence_count }
              prefix={ <FaCircle/> }
              valueStyle={ {color: "#3f8600"} }
            />
          </Card>
        </Col>
      </Row>
      <GuildFeature/>
    </>
  );
};