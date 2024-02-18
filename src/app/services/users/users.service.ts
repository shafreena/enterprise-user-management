import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersState } from '../../interfaces/users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  private url = 'https://dummyjson.com/user';

  getUserData() {
    return this.http.get<UsersState>(this.url, { observe: 'response' });
  }

}
