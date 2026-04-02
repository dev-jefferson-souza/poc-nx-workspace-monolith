import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@poc-nx-workspace-monolith/shared/i18n';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbService } from 'libs/shared/layout/src/lib/services/breadcrumb.services';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { finalize } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    MultiSelectModule,
    InputSwitchModule,
    ButtonModule,
    TranslateModule,
  ],
})
export class UserFormComponent implements OnInit {
  readonly #breadcrumbService = inject(BreadcrumbService);
  readonly #translateService = inject(TranslateService);
  readonly #languageService = inject(LanguageService);
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #usersService = inject(UsersService);

  userForm!: FormGroup;
  roles = signal<string[]>([]);
  loadingRoles = signal(false);

  constructor() {
    effect(
      () => {
        this.#languageService.currentLanguage();
        this.updateBreadcrumb();
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  private initForm(): void {
    this.userForm = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      roles: [[], [Validators.required]],
      status: [true],
    });
  }

  private loadRoles(): void {
    this.loadingRoles.set(true);
    this.#usersService
      .getRoles()
      .pipe(finalize(() => this.loadingRoles.set(false)))
      .subscribe((roles) => this.roles.set(roles));
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('User created:', this.userForm.value);
      // In a real app, we'd call the service to create the user here.
      this.#router.navigate(['/users']);
    }
  }

  private updateBreadcrumb() {
    this.#breadcrumbService.setBreadcrumbItems({
      items: [
        { label: this.#translateService.instant('featureUsers.breadcrumb.users'), routerLink: '/users' },
        { label: this.#translateService.instant('featureUsers.breadcrumb.create') },
      ],
    });
  }
}
