export const USER_ROLE = 'USER';
export const ADMIN_ROLE = 'ADMIN';
export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}