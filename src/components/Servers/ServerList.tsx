import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDiscordServer } from "../../contexts/discord";
import { getDiscordServers } from "../../services";

export const ServerList: React.FC = () => {
  const navigate = useNavigate();
  const {servers, setServers, selectedServer, setSelectedServer} = useDiscordServer();
  
  useEffect(() => {
    getDiscordServers()
      .then(data => {
        setServers(data)
        console.log(data)
      })
  }, [])
  
  return (<Row gutter={ [16, 24] }>
    <Col span={ 24 }>
      <div style={ {textAlign: 'center'} }>
        <h1>Select a server to manage</h1>
      </div>
    </Col>
    { servers.map((server: any) => {
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
                          window.open("http://localhost:3000/v1/discord/invite");
                        }
                      }>Invite Bot
                      </button>
                    </div>
                  )
                ) || (
                  <div className="btn btn-gray">
                    <button  title="No permission to manage server. Please ask the owner/admin to give you the manage server permission." onClick={
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