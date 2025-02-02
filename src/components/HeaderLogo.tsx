import React, { useState } from 'react';
import { Avatar, ConfigProvider, Space, theme } from "antd";

const AppLogo: React.FC = () => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode] = useState(
    colorModeFromLocalStorage || systemPreference,
  );
  
  const logoTextStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: mode === 'light' ? '#000' : '#fff',
  };
  
  return (
    <ConfigProvider
      theme={ {
        algorithm:
          mode === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
      } }
    >
      <Space style={ {justifyContent: "left", width: "100%"} }>
        <Avatar src="https://cdn.discordapp.com/avatars/1302015282411470940/c47dce2d0b309c87cc61e452d65b5184.webp"
                size={ 40 } style={ {marginTop: -10} }/>
      </Space>
    </ConfigProvider>
  );
};

export default AppLogo;
