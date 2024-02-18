export interface UsersState {
  users: Array<UserType> | undefined
}
export interface UserType {
  firstName: string,
  lastName: string,
  age: number,
  email: string
  id: number
}
