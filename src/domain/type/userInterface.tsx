export interface User {
  address: string;
  created_at: string;
  _v: number;
  _id: string;
}

export const defaultUser: User = {
  address: "",
  created_at: "",
  _v: 0,
  _id: "",
};