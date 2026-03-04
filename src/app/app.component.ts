
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <mat-toolbar color="primary">
    <span class="toolbar-title">Oasis Admin Portal</span>
  </mat-toolbar>
  <nav class="side">
    <a routerLink="/products" routerLinkActive="active">Service Plans</a>
    <a routerLink="/contracts" routerLinkActive="active">Contracts & Pricing</a>
    <a routerLink="/features" routerLinkActive="active">Features</a>
    <a routerLink="/snapshots" routerLinkActive="active">Snapshots</a>
    <a routerLink="/users" routerLinkActive="active">Users & Roles</a>
  </nav>
  <main class="content">
    <router-outlet></router-outlet>
  </main>
  `
})
export class AppComponent {}
