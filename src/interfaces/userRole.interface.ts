export interface IUserRole {
  id: string;
  name: string;
}

export interface IUserStatus {
  id: string;
  name: string;
}

export const userRoles: IUserRole[] = [
  {id: "1", name: "Admin"},
  {id: "2", name: "User"},
  {id: "3", name: "Viewer"},
];

export const userStatuses: IUserStatus[] = [
  {id: "1", name: "Active"},
  {id: "2", name: "Inactive"}
];