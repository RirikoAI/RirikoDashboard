import React, { useState, useEffect, useContext, useRef } from "react";
import { AutoComplete, Col, Input, Row, Space, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useDiscordServer } from "../../contexts/discord-server";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { APP_URL } from "../../constants";
import { getDiscordServers } from "../../services/discord";

export const ServerList: React.FC = () => {
  const navigate = useNavigate();
  const {servers, setServers, selectedServer, setSelectedServer, showOnlyAccessible, setShowOnlyAccessible} = useDiscordServer();
  const [serverSearch, setServerSearch] = useState("");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    getDiscordServers()
      .then(data => {
        setServers(data)
      })
  }, [])

  // Maintain focus on the input field when search is active
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [serverSearch]);

  return (<Row gutter={ [16, 24] }>
    <Col span={ 24 }>
      <div style={ {textAlign: 'center', marginTop: 24, marginBottom: 24} }>
        <h1>Select a server to manage</h1>
        <AutoComplete
          style={ {width: "100%", maxWidth: "550px", minWidth: "200px"} }
          filterOption={ false }
          className={ "server-search" }
        >
          <Input
            ref={inputRef}
            size="large"
            placeholder="Search server"
            value={serverSearch}
            onChange={e => setServerSearch(e.target.value)}
            suffix={
              serverSearch ? (
                <CloseCircleOutlined
                  onClick={() => {
                    setServerSearch("");
                    // Ensure focus is maintained after clearing
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  style={{ cursor: "pointer", color: "#999" }}
                />
              ) : (
                <SearchOutlined />
              )
            }
          />
        </AutoComplete>
        <div style={{ marginTop: 16 }}>
          <Space>
            <span>Show only servers I can manage</span>
            <Switch 
              checked={showOnlyAccessible} 
              onChange={setShowOnlyAccessible} 
            />
          </Space>
        </div>
      </div>
    </Col>
    { servers
      .filter((server: any) => 
        // Filter by accessibility
        (!showOnlyAccessible || server.owner || server.can_manage_server) &&
        // Filter by search term
        (serverSearch === "" || 
         server.name.toLowerCase().includes(serverSearch.toLowerCase()))
      )
      .map((server: any) => {
      let bannerUrl = (server.banner) ? `url(https://cdn.discordapp.com/banners/${ server.id }/${ server.banner }.png?size=1024)` : 'url(/images/discordblue.png)';
      let iconUrl = (server.icon) ? `https://cdn.discordapp.com/icons/${ server.id }/${ server.icon }.png` : '/images/discordblue.png';
      let bannerBlur = (server.banner) ? `` : `banner-image-blur`;
      if (server.icon && !server.banner) bannerUrl = `url(${ iconUrl })`;
      return (
        <Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 } xl={ 6 } key={ server.id }>
          <div className="server-card">
            <div className="banner">
              <div className={ "banner-image " + bannerBlur }
                   style={ {backgroundImage: bannerUrl} }></div>
              <img src={ iconUrl }/>
            </div>
            <div className="menu">
              <div className="opener"><span></span><span></span><span></span></div>
            </div>
            <h2 className="name">{ server.name }</h2>
            <div
              className="title">{ (server.owner ? 'Owner' : ((server.can_manage_server) ? 'Admin' : 'Member')) }</div>
            <div className="actions">
              <div className="follow-info">
                <h2><a href="#"><span>{ server.approximate_member_count }</span><small>Members</small></a></h2>
                <h2><a href="#"><span>1000</span><small>Plugins Enabled</small></a></h2>
              </div>
              {
                (server.owner || server.can_manage_server) && (
                  (server.bot_in_guild) && (
                    <div className="btn btn-green">
                      <button onClick={
                        () => {
                          setSelectedServer(server)
                          navigate("/dashboard")
                        }
                      }>Manage Server
                      </button>
                    </div>
                  ) || (
                    <div className="btn">
                      <button onClick={
                        () => {
                          window.open(`${ APP_URL }/v1/discord/invite`);
                        }
                      }>Invite Bot
                      </button>
                    </div>
                  )
                ) || (
                  <div className="btn btn-gray">
                    <button
                      title="No permission to manage server. Please ask the owner/admin to give you the manage server permission."
                      onClick={
                        () => {
                          setSelectedServer(server)
                          navigate("/dashboard")
                        }
                      }>View Server
                    </button>
                  </div>
                )
              }
            </div>
            <div className="desc"></div>
          </div>
        </Col>
      )
    }) }
  </Row>)
}
