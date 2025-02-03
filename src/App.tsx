import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  notificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { accessControlProvider } from "./providers/accessControlProvider";
import { UserOutlined } from "@ant-design/icons";
import nestjsxCrudDataProviderCustom from "./providers/nestjsx-crud";
import { API_URL } from "./constants";
import { AppRoutes } from "./routes";
import { resources } from "./resources";
import { DiscordServerProvider } from "./contexts/discord";

function App() {
  const {t, i18n} = useTranslation();
  
  const dataProvider = nestjsxCrudDataProviderCustom(API_URL);
  
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DiscordServerProvider>
          <ColorModeContextProvider>
            <Refine
              dataProvider={ dataProvider }
              notificationProvider={ notificationProvider }
              routerProvider={ routerBindings }
              authProvider={ authProvider }
              accessControlProvider={ accessControlProvider }
              i18nProvider={ i18nProvider }
              resources={ resources }
              options={ {
                disableTelemetry: true,
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              } }
            >
              <AppRoutes/>
              
              <RefineKbar/>
              <UnsavedChangesNotifier/>
              <DocumentTitleHandler/>
            </Refine>
          </ColorModeContextProvider>
        </DiscordServerProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
