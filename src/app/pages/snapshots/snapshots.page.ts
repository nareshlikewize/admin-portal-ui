
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-snapshots-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Snapshots</h2>
    <div class="grid grid-2">
      <div>
        <label>Protect Product ID</label>
        <input class="input" [(ngModel)]="productId" />
      </div>
    </div>
    <div style="margin-top:14px; display:flex; gap:12px;">
      <button class="button" (click)="load()">Load Snapshots</button>
    </div>
    <pre *ngIf="data" style="white-space: pre-wrap;">{{ data | json }}</pre>
    <p *ngIf="message">{{message}}</p>
  </div>
  `
})
export class SnapshotsPageComponent {
  productId = '';
  data: any;
  message = '';
  constructor(private api: ApiService) {}
  load(){
    if(!this.productId){ this.message='Provide protect_product_id'; return; }
    this.api.getSnapshots(this.productId).subscribe({
      next: (res:any) => { this.data = res; this.message='Loaded'; },
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
}
