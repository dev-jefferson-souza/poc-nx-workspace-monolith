import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbService } from 'libs/shared/layout/src/lib/services/breadcrumb.services';
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
  imports: [CommonModule, TableModule, BadgeModule, SkeletonModule, CardModule, ButtonModule, RouterLink, TranslateModule],
})
export class UserListComponent implements OnInit {
  readonly #usersService = inject(UsersService);
  readonly #breadcrumbService = inject(BreadcrumbService);

  users = signal<User[]>([]);

  error = signal(false);
  loading = signal(false);

  ngOnInit(): void {
    this.loadUsers();
    this.updateBreadcrumb();
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

  private updateBreadcrumb() {
    this.#breadcrumbService.setBreadcrumbItems({
      items: [{ label: 'featureUsers.breadcrumb.users', routerLink: '/users' }],
    });
  }
}
