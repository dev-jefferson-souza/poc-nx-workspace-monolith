export interface User {
  id: number;
  name: string;
  roles: Array<'ADMIN' | 'USER' | 'DEV' | 'GUEST'>;
  status: boolean;
}
