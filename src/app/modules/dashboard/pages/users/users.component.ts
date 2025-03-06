import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../../../interfaces/User.interface';
import { Store } from '@ngrx/store';
import { selectUsers } from './store/user.selectors';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private store: Store) {
      this.users$ = this.store.select(selectUsers);
    }

    ngOnInit(): void {
      this.usersService.loadUsers();
    }
  // ngOnInit(): void {
  //   this.usersService.getUsers().subscribe({
  //     next: (usersPagination) => {
  //       console.log(usersPagination);
  //     },
  //   });
  // }


  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }

  deleteUserById(id: string) {
    this.usersService.deleteUserById(id);
  }
}
