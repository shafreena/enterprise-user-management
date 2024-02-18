import { createReducer, on } from "@ngrx/store"
import { saveUser, setInitialUserList } from "./users.action"
import { UserType, UsersState } from '../../interfaces/users/users.interface';


export const initialUserState: UsersState = {
  users: []
}
export const userReducer = createReducer(
  initialUserState,
  on(saveUser, (state, user) => (updateUserDetails(state, user))),
  on(setInitialUserList, (state, userList) => ({ ...state, users: userList.userList })),

);

export function updateUserDetails(state: UsersState, updatedUser: UserType) {
  let updatedUserList = JSON.parse(JSON.stringify(state.users));
  updatedUserList.forEach((user: UserType) => {
    if (user.id === updatedUser.id) {
      user.firstName = updatedUser.firstName;
      user.lastName = updatedUser.lastName;
      user.age = updatedUser.age;
      user.email = updatedUser.email;
    }
  });
  return { users: updatedUserList };
}




