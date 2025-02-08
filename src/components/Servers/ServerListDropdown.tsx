import { Button, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";
import { useDiscordServer } from "../../contexts/discord";
import { useNavigate } from "react-router-dom";
const {Text} = Typography;

export const ServerListDropdown: React.FC = () => {
  const {servers, setSelectedServer, selectedServer} = useDiscordServer();
  const navigate = useNavigate();
  
  let serverItems = servers.map((server) => ({
    key: server.id.toString(),
    label: server.name,
    onClick: () => {
      setSelectedServer(server)
      navigate("/dashboard");
    },
  }));
  
  return (
    <Dropdown
      menu={ {
        items: [...serverItems, {
          key: "back",
          label: "Back to your servers",
          onClick: () => navigate("/"),
        }],
        selectedKeys: [''],
      } }
    >
      <Button type="text" className={ "server-list-button" }>
        <Space>
          <Text>{selectedServer.name}</Text>
          <DownOutlined/>
        </Space>
      </Button>
    </Dropdown>
  );
}