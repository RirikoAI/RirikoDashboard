import { Button, Card, Col, Row, Switch, Input } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { RiChatAiLine, RiImageCircleAiLine } from "react-icons/ri";
import { TfiHandOpen } from "react-icons/tfi";
import { ImExit } from "react-icons/im";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { PiScanSmileyLight, PiSmileyMelting } from "react-icons/pi";
import { SlPresent } from "react-icons/sl";
import { LuTwitch } from "react-icons/lu";
import React, { useState } from "react";

// Plugin categories and their respective plugins
const pluginCategories = [
  {
    category: "Artificial Intelligence",
    plugins: [
      { title: "AI Chatbot", description: "Chat with a bot that has its own personality and can learn from your conversations.", icon: <RiChatAiLine />, enabled: true },
      { title: "Stable Diffusion", description: "Generate images by entering your own prompts.", icon: <RiImageCircleAiLine />, enabled: true }
    ]
  },
  {
    category: "General Features",
    plugins: [
      { title: "Welcome Banner", description: "Automatically sends the welcome banner when a new member joins.", icon: <TfiHandOpen />, enabled: false },
      { title: "Farewell Banner", description: "Automatically sends the farewell banner when a member leaves.", icon: <ImExit />, enabled: true },
      { title: "Auto Voice Channel", description: "Creates a voice channel when a member joins a specific voice channel.", icon: <MdOutlineRecordVoiceOver />, enabled: true },
      { title: "Memes", description: "Generate memes with a simple command.", icon: <PiScanSmileyLight />, enabled: true },
      { title: "Reactions", description: "Easily generate random reaction GIFs with a simple command.", icon: <PiSmileyMelting />, enabled: true },
      { title: "Giveaways", description: "Run giveaways and drops in your server.", icon: <SlPresent />, enabled: true }
    ]
  },
  
  {
    category: "Moderation",
    plugins: [
      { title: "Auto Moderation", description: "Automatically moderate your server with a set of rules.", icon: <RiChatAiLine />, enabled: true },
      { title: "Anti-Spam", description: "Automatically remove spam messages from your server.", icon: <RiChatAiLine />, enabled: true },
      { title: "Auto Role", description: "Automatically assign roles to members when they join.", icon: <RiChatAiLine />, enabled: true },
    ]
  },
  {
    category: "Stream Alerts",
    plugins: [
      { title: "Twitch Stream Notification", description: "Subscribe to a Twitch streamer and get notified when they go live.", icon: <LuTwitch />, enabled: true }
    ]
  },
];

export const PluginList: React.FC = () => {
  const [pluginSearch, setPluginSearch] = useState("");
  
  return (
    <>
      <h2>Search Plugins</h2>
      <Input
        placeholder="Search plugins..."
        value={pluginSearch}
        onChange={e => setPluginSearch(e.target.value)}
        style={{ marginBottom: 24, width: "100%", maxWidth: 400 }}
        suffix={
          pluginSearch && (
            <CloseCircleOutlined
              onClick={() => setPluginSearch("")}
              style={{ cursor: "pointer", color: "#999" }}
            />
          )
        }
      />
      
      {pluginCategories.map((category, categoryIndex) => {
        // Filter plugins by title or description
        const filteredPlugins = category.plugins.filter(plugin =>
          plugin.title.toLowerCase().includes(pluginSearch.toLowerCase()) ||
          plugin.description.toLowerCase().includes(pluginSearch.toLowerCase())
        );
        
        // Hide empty categories
        if (filteredPlugins.length === 0) return null;
        
        return (
          <div key={categoryIndex}>
            <h2>{category.category}</h2>
            <Row gutter={24}>
              {filteredPlugins.map((plugin, index) => (
                <Col key={index} xl={6} lg={12} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                  <Card title={plugin.title} extra={<Switch defaultChecked={plugin.enabled} />}>
                    <div className="feature-icon">{plugin.icon}</div>
                    <p>{plugin.description}</p>
                    <Button type="primary">Manage</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </>
  );
};
