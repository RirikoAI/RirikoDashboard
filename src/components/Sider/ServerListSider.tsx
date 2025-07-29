import { Divider, Tooltip } from "antd";
import React from "react";
import { Link } from "@refinedev/core";
import { useDiscordServer } from "../../contexts/discord-server";

export const ServerListSider = (user: any) => {
  const {servers, setSelectedServer, selectedServer, showOnlyAccessible} = useDiscordServer();
  return (
    <div className={ "server-list-container" }>
      <div className={ "server-list-scroll" }>
        <div className={ "server-list" }>
          <ul className={ "server-list-ul" }>
            <li className={ "server-list-item" }>
              <Link to={ "/dashboard" }>
                <img src={ user?.avatar || '' } alt={ "" }/>
              </Link>
            </li>
            <li>
              <Divider style={ {margin: "0"} }/>
            </li>
            { servers
              .filter((server: any) => !showOnlyAccessible || server.owner || server.can_manage_server)
              .map((server: any) => {
                let iconUrl = (server.icon) ? `https://cdn.discordapp.com/icons/${ server.id }/${ server.icon }.png` : '/images/discordblue.png';
                return (
                  <li className={ "server-list-item" } key={ server.id }>
                    { (selectedServer.name === server.name) && <span className={ "active" }></span> }
                    <Tooltip title={ server.name } placement={ "right" }>
                      <Link to={ "/dashboard" } onClick={ () => setSelectedServer(server) }>
                        <img src={ iconUrl }/>
                      </Link>
                    </Tooltip>
                  </li>
                )
              }
            ) }
          </ul>
        </div>
      </div>
    </div>
  );
}
