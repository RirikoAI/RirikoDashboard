import { Menu } from "antd";
import React from "react";
import { pluginCategories } from "../GuildFeature/PluginList";

export const PluginsMenu = (navigate: any, translate: any) => (
  <>
    {pluginCategories.map((category, categoryIndex) => (
      <React.Fragment key={categoryIndex}>
        <div role="presentation" className="ant-menu-item-group-title" title={category.category}>
          {category.category}
        </div>
        {category.plugins.map((plugin) => (
          <Menu.Item
            title={plugin.title}
            key={plugin.key}
            onClick={() => {
              navigate(`/${category.key}/${plugin.key}`);
            }}
            icon={plugin.icon}
          >
            {translate(`plugins.${plugin.key}`, plugin.title)}
          </Menu.Item>
        ))}
      </React.Fragment>
    ))}
  </>
);