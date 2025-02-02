import {UserOutlined} from "@ant-design/icons";
import {ResourceProps} from "@refinedev/core/src/interfaces/bindings/resource";

export const resources: ResourceProps[] = [
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
      canDelete: true,
      icon: <UserOutlined style={{fontSize: '16px', color: '#08c'}}/>,
    },
  },
  {
    name: "articles",
    list: "/articles",
    create: "/articles/create",
    edit: "/articles/edit/:id",
    show: "/articles/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "products",
    list: "/products",
    create: "/products/create",
    edit: "/products/edit/:id",
    show: "/products/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "lockers",
    list: "/lockers",
    create: "/lockers/create",
    edit: "/lockers/edit/:id",
    show: "/lockers/show/:id",
    meta: {
      canDelete: true,
    },
  },
]