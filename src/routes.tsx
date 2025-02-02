import { Outlet, Route, Routes } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router-v6";
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import HeaderLogo from "./components/HeaderLogo";
import { Header } from "./components";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import { ArticleCreate, ArticleEdit, ArticleList, ArticleShow } from "./pages/articles";
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./pages/products";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { UpdatePasswordPage } from "./pages/updatePassword/updatePassword";
import { ConfirmEmailPage } from "./pages/confirmEmail/confirmEmail";
import * as React from "react";
import { LockerCreate, LockerEdit, LockerList, LockerShow } from "./pages/lockers";
import { Callback } from "./pages/login/callback";
import { DashboardPage } from "./pages/dashboard";
import { ThemedLayout } from "./layout/ThemedLayout";

export function AppRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={ <CatchAllNavigate to="/login"/> }>
            <ThemedLayout
              Header={ () => <Header sticky/> }
            >
              <Outlet/>
            </ThemedLayout>
          </Authenticated>
        }
      >
        <Route
          index
          element={ <DashboardPage/> }
        />
        <Route path="/dashboard" element={ <DashboardPage/> }/>
      </Route>
      <Route
        element={
          <Authenticated fallback={ <CatchAllNavigate to="/login"/> }>
            <ThemedLayoutV2
              Title={ ({collapsed}) => (
                <ThemedTitleV2
                  // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                  collapsed={ collapsed }
                  // Adjust to different logo when collapsed, if needed
                  icon={ collapsed ? <HeaderLogo/> : <HeaderLogo/> }
                  text='RIRIKO' // App title if needed
                />
              ) }
              Header={ () => <Header sticky/> }
              Sider={ (props) => <ThemedSiderV2 { ...props } fixed/> }
            >
              <Outlet/>
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route path="/users">
          <Route index element={ <UserList/> }/>
          <Route path="create" element={ <UserCreate/> }/>
          <Route path="edit/:id" element={ <UserEdit/> }/>
          <Route path="show/:id" element={ <UserShow/> }/>
        </Route>
        <Route path="/articles">
          <Route index element={ <ArticleList/> }/>
          <Route path="create" element={ <ArticleCreate/> }/>
          <Route path="edit/:id" element={ <ArticleEdit/> }/>
          <Route path="show/:id" element={ <ArticleShow/> }/>
        </Route>
        <Route path="/products">
          <Route index element={ <ProductList/> }/>
          <Route path="create" element={ <ProductCreate/> }/>
          <Route path="edit/:id" element={ <ProductEdit/> }/>
          <Route path="show/:id" element={ <ProductShow/> }/>
        </Route>
        <Route path="/lockers">
          <Route index element={ <LockerList/> }/>
          <Route path="create" element={ <LockerCreate/> }/>
          <Route path="edit/:id" element={ <LockerEdit/> }/>
          <Route path="show/:id" element={ <LockerShow/> }/>
        </Route>
        <Route path="*" element={ <ErrorComponent/> }/>
      </Route>
      <Route
        element={
          <Authenticated fallback={ <Outlet/> }>
            <NavigateToResource/>
          </Authenticated>
        }
      >
        <Route path="/login" element={ <Login/> }/>
        <Route path="/callback" element={ <Callback/> }/>
        <Route path="/register" element={ <Register/> }/>
        <Route path="/forgot-password" element={ <ForgotPassword/> }/>
        <Route path="/password-change/:id" element={ <UpdatePasswordPage/> }/>
        <Route path="/confirm-email/:id" element={ <ConfirmEmailPage/> }/>
      </Route>
    </Routes>
  )
}