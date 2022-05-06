export interface UserInfo {
  email: string;
  name: string;
  image?: string | null;
  role?: string;
}
export interface UserRole {
  id: number;
  name: string;
  code: string;
}
