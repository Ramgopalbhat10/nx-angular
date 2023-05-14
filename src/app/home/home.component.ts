import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'nx-angular-root',
  imports: [RouterModule],
  template: `
    <h2>{{ title }}</h2>
    <a [routerLink]="['/login']" routerLinkActive="active">Login</a>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  title = 'Welcome!';
}
