
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Users & Roles</h2>
    <p>Coming soon: manage users, roles and permissions stored in Postgres.</p>
  </div>
  `
})
export class UsersPageComponent {}
