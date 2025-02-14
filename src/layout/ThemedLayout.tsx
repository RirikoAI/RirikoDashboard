import React from "react";
import { Grid, Layout as AntdLayout } from "antd";

import { ThemedHeaderV2 as DefaultHeader } from "@refinedev/antd";
import { ThemedLayoutContextProvider } from "@refinedev/antd";
import { useLocation } from "react-router-dom";
import { getCssSafePath } from "../helpers/path.helper";
import { IonContent, IonRefresher, IonSpinner } from "@ionic/react";
import { IoMdRefresh } from "react-icons/io";

export const ThemedLayout: React.FC<any> = ({
                                              children,
                                              Header,
                                              Footer,
                                              OffLayoutArea,
                                              initialSiderCollapsed,
                                            }) => {
  const breakpoint = Grid.useBreakpoint();
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
      <AntdLayout style={ {minHeight: "100vh"} }>
        <AntdLayout className={ page }>
          <HeaderToRender/>
          <IonContent className="ion-padding">
            <IonRefresher slot="fixed" pullFactor={ 0.5 } pullMin={ 100 } pullMax={ 200 } onIonRefresh={ () => {
              window.location.reload();
            } }>
              <div className={ "refresh" } style={ {
                display: "none",
              } }>
                <IoMdRefresh size={ 32 }/>
              </div>
              <div className={ "refreshing" } style={ {
                display: "none",
              } }>
                <IonSpinner name="crescent" style={{width: 32}}/>
              </div>
            </IonRefresher>
            <AntdLayout.Content>
              <div
                className={ "ant-layout-has-sider " }
                style={ {
                  minHeight: 360,
                  padding: isSmall ? 24 : 12,
                } }
              >
                { children }
              </div>
              { OffLayoutArea && <OffLayoutArea/> }
            </AntdLayout.Content>
          </IonContent>
          { Footer && <Footer/> }
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  );
};
