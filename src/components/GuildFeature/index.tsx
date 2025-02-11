import { AutoComplete, Button, Input, Space } from "antd";
import React from "react";
import './style.css';
import { SearchOutlined } from "@ant-design/icons";
import { PluginList } from "./PluginList";
import { useDiscordServer } from "../../contexts/discord";

export const GuildFeature: React.FC = () => {
  const {selectedServer} = useDiscordServer();
  
  return (
    <div className={ "guild-feature" }>
      <Space style={ {float: "right"} }>
        <AutoComplete
          filterOption={ false }
        >
          <Input
            size="large"
            placeholder="Search plugins"
            suffix={ <SearchOutlined/> }
          />
        </AutoComplete>
      </Space>
      <h1 style={ {marginBottom: 24} }>Manage Plugins</h1>
      <hr style={ {marginBottom: 24} }/>
      { (selectedServer.can_manage_server && selectedServer.bot_in_guild) && (
        <PluginList/>
      ) || (
        (selectedServer.can_manage_server && (
          <>
            <p>In order to manage plugins in {selectedServer.name}, you need to invite Ririko to the server.</p>
            <p><Button type="primary">Invite Ririko</Button></p>
          </>
        ) || (
          <p>You do not have permission to invite the bot or manage plugins in this server.</p>
        ))
      
      ) }
    </div>
  );
}