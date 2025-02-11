import React from "react";
import { Grid, Layout as AntdLayout } from "antd";

import { ThemedHeaderV2 as DefaultHeader } from "@refinedev/antd";
import { RefineThemedLayoutV2Props } from "@refinedev/antd";
import { ThemedLayoutContextProvider } from "@refinedev/antd";
import { ThemedSiderV2 as DefaultSider } from "../components/Sider";
import { getCssSafePath } from "../helpers/path.helper";
import { useLocation } from "react-router-dom";

// from ThemedLayoutV2 of "@refinedev/antd"
export const ThemedLayoutFull: React.FC<RefineThemedLayoutV2Props> = ({
                                                                        children,
                                                                        Header,
                                                                        Sider,
                                                                        Title,
                                                                        Footer,
                                                                        OffLayoutArea,
                                                                        initialSiderCollapsed,
                                                                      }) => {
  const breakpoint = Grid.useBreakpoint();
  const SiderToRender = DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;
  
  const location = useLocation();
  const [page, setPage] = React.useState<string>("");
  
  React.useEffect(() => {
    setPage(getCssSafePath(location.pathname));
  }, [useLocation().pathname]);
  
  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={ initialSiderCollapsed }
    >
      <AntdLayout style={ {minHeight: "100vh"} }
                  className={ page }>
        <SiderToRender Title={ Title }/>
        <AntdLayout>
          <HeaderToRender/>
          <AntdLayout.Content>
            <div
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
