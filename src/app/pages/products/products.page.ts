
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Create / Update Service Plan</h2>
    <div class="grid grid-2">
      <div>
        <label>Protect Product ID</label>
        <input class="input" [(ngModel)]="model.protect_product_id" placeholder="UUID" />
      </div>
      <div>
        <label>Account ID</label>
        <input class="input" [(ngModel)]="model.account_id" placeholder="Account UUID" />
      </div>
      <div>
        <label>Name</label>
        <input class="input" [(ngModel)]="model.name" placeholder="GoldServicePlan" />
      </div>
      <div>
        <label>Alias</label>
        <input class="input" [(ngModel)]="model.alias" placeholder="GoldServicePlan" />
      </div>
      <div>
        <label>Status</label>
        <select class="input" [(ngModel)]="model.AccountProductStatusType">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div>
        <label>Is Active</label>
        <select class="input" [(ngModel)]="model.is_active">
          <option [ngValue]="true">true</option>
          <option [ngValue]="false">false</option>
        </select>
      </div>
      <div>
        <label>Description</label>
        <input class="input" [(ngModel)]="model.description" />
      </div>
    </div>
    <div style="margin-top:14px; display:flex; gap:12px;">
      <button class="button" (click)="save()">Save Product</button>
      <button class="button" style="background:#22c55e" (click)="load()">Load</button>
    </div>
    <p *ngIf="message">{{message}}</p>
  </div>
  `
})
export class ProductsPageComponent {
  model: any = {
    protect_product_id: '',
    account_id: '',
    name: '',
    alias: '',
    AccountProductStatusType: 'Active',
    is_active: true,
    description: ''
  };
  message = '';
  constructor(private api: ApiService) {}
  save(){
    this.api.upsertProduct(this.model).subscribe({
      next: (res:any) => this.message = 'Saved! Snapshot generated.',
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
  load(){
    if(!this.model.protect_product_id){ this.message='Provide protect_product_id'; return; }
    this.api.getProduct(this.model.protect_product_id).subscribe({
      next: (res:any) => { this.model = { ...this.model, ...res }; this.message = 'Loaded'; },
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
}
