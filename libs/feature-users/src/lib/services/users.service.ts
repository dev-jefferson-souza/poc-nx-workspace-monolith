import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUsers() {
    return of([
      { id: 1, name: 'John Doe', roles: ['ADMIN', 'USER', 'DEV'], status: true },
      { id: 2, name: 'Jane Doe', roles: ['ADMIN', 'USER'], status: false },
      { id: 3, name: 'Alice Doe', roles: ['ADMIN', 'USER', 'GUEST'], status: false },
    ] as User[]).pipe(delay(1000));
  }

  getRoles() {
    return of(['ADMIN', 'USER', 'DEV', 'GUEST'] as string[]).pipe(delay(1000));
  }
}
