import { createAction, props } from "@ngrx/store";
import { UserType } from '../../interfaces/users/users.interface';

export const saveUser = createAction('[Users Component]Save', (user: UserType) => (user));
export const setInitialUserList = createAction('[Users Component]SetInitial', props<{ userList: UserType[] | undefined }>());