export interface IUser {
  username: string;
  useremail: {
    email: string;
    is_verified: boolean;
    is_primary: boolean;
  };
  password: string;
}
