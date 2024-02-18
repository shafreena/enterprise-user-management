import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from './components/users/user-table/user-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-management';
}
