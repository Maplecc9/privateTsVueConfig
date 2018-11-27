export interface UserInfo {
  userName: string,
  password: string,
  phone?: string
}

export interface StateInterface {
  user: UserInfo
}
