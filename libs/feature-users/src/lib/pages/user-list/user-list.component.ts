import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [CommonModule, TableModule, BadgeModule, SkeletonModule, CardModule, ButtonModule, RouterLink],
})
export class UserListComponent implements OnInit {
  readonly #usersService = inject(UsersService);

  users = signal<User[]>([]);

  error = signal(false);
  loading = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.users.set([]);
    this.loading.set(true);
    this.error.set(false);

    this.#usersService
      .getUsers()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (users) => this.users.set(users),
        error: () => this.error.set(true),
      });
  }
}
