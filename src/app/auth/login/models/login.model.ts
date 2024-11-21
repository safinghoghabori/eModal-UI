export interface LoginReq {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResp {
  token: string;
  data: UserData;
}
