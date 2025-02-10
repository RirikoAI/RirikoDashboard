import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Switch,
  Typography,
  theme, Input, AutoComplete,
} from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";
import { IUser } from "../../interfaces/user.interface";
import { LANGUAGES } from "../../constants";
import '../../App.css';
import { ServerListDropdown } from "../Servers/ServerListDropdown";

const {Text} = Typography;
const {useToken} = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
                                                                    sticky,
                                                                  }) => {
  const {token} = useToken();
  const {i18n} = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const {data: user} = useGetIdentity<IUser>();
  const {mode, setMode} = useContext(ColorModeContext);
  
  const currentLocale = locale();
  
  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
        <span style={ {marginRight: 8} }>
          <Avatar size={ 16 } src={ `/images/flags/${ lang }.svg` }/>
        </span>
      ),
      // @ts-ignore
      label: LANGUAGES[lang],
    }));
  
  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };
  
  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }
  
  return (
    <AntdLayout.Header style={ headerStyles }>
      {
        // if current page is /dashboard, show the title
        (window.location.pathname === '/' || window.location.pathname === '/') && (
          <Space style={ {justifyContent: "left", width: "100%"} }>
            <Avatar src="/images/ririko.png"
                    size={ 40 } style={ {marginTop: -5} }/>
            <Text style={ {fontSize: 20, fontWeight: 700} }>RIRIKO</Text>
          </Space> // else, show the back button
        ) || (
          <ServerListDropdown/>
        )
      }
      <Space className={ "header-search-bar" }>
        <AutoComplete
          style={{ width: "100%", maxWidth: "550px", minWidth: "200px", marginLeft: "20px" }}
          filterOption={false}
        >
          <Input
            size="large"
            placeholder="Search everything"
            suffix={<SearchOutlined />}
          />
        </AutoComplete>
      </Space>
      <Space style={ {justifyContent: "right", width: "100%"} }>
        <Dropdown
          menu={ {
            items: menuItems,
            selectedKeys: currentLocale ? [currentLocale] : [],
          } }
        >
          <Button type="text">
            <Space>
              <Avatar size={ 16 } src={ `/images/flags/${ currentLocale }.svg` }/>
              {  // @ts-ignore
                LANGUAGES[currentLocale]
              }
              <DownOutlined/>
            </Space>
          </Button>
        </Dropdown>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={ () => setMode(mode === "light" ? "dark" : "light") }
          defaultChecked={ mode === "dark" }
        />
        <Space style={ {marginLeft: "8px"} } size="middle">
          { user?.displayName && <Text strong>{ user.displayName }</Text> }
          { user?.avatar && <Avatar src={ user?.avatar } alt={ user?.displayName }/> }
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
