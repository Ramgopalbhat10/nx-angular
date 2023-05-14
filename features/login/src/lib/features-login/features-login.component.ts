import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, createSelector } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { LoginActionsGroup, loginFeature } from '../+state/featrue-login.store';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

const loginPageViewModel = createSelector({
  loginState: loginFeature.selectLoginState,
  isLoading: loginFeature.selectIsLoading,
  error: loginFeature.selectError
})

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'nx-angular-features-login',
  standalone: true,
  imports: [CommonModule, LetDirective, ReactiveFormsModule, RouterModule],
  templateUrl: './features-login.component.html',
  styleUrls: ['./features-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesLoginComponent implements OnInit {
  private readonly store = inject(Store);
  readonly vm$ = this.store.select(loginPageViewModel);
  loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  })

  ngOnInit() {
    this.store.dispatch(LoginActionsGroup.loginOpened())
  }

  login() {
    const loginInput = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.store.dispatch(LoginActionsGroup.loginInit({ loginInput }));
    this.loginForm.reset();
  }
}
