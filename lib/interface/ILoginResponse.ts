export interface ILoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
    isFirstTimeLogin: boolean;
  };
}
