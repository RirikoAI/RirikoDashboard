import React from "react";
import { Grid, Layout as AntdLayout } from "antd";

import { ThemedHeaderV2 as DefaultHeader } from "@refinedev/antd/src/components/themedLayoutV2/header";
import { RefineThemedLayoutV2Props } from "@refinedev/antd/src/components/themedLayoutV2/types";
import { ThemedLayoutContextProvider } from "@refinedev/antd/src/contexts";

export const ThemedLayout: React.FC<RefineThemedLayoutV2Props> = ({
                                                                      children,
                                                                      Header,
                                                                      Footer,
                                                                      OffLayoutArea,
                                                                      initialSiderCollapsed,
                                                                    }) => {
  const breakpoint = Grid.useBreakpoint();
  const HeaderToRender = Header ?? DefaultHeader;
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;
  
  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={ initialSiderCollapsed }
    >
      <AntdLayout style={ {minHeight: "100vh"} }>
        <AntdLayout>
          <HeaderToRender/>
          <AntdLayout.Content>
            <div
              className={"ant-layout-has-sider"}
              style={ {
                minHeight: 360,
                padding: isSmall ? 24 : 12,
              } }
            >
              { children }
            </div>
            { OffLayoutArea && <OffLayoutArea/> }
          </AntdLayout.Content>
          { Footer && <Footer/> }
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  );
};
