
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Features (Make/Model Lists)</h2>
    <div class="grid grid-2">
      <div>
        <label>Protect Product ID</label>
        <input class="input" [(ngModel)]="model.protect_product_id" />
      </div>
      <div>
        <label>Feature Name</label>
        <input class="input" [(ngModel)]="model.Name" placeholder="GoldServicePlanModels" />
      </div>
    </div>
    <label>Device SKU (comma-separated)</label>
    <input class="input" [(ngModel)]="deviceSkuCsv" placeholder="sku1,sku2" />
    <div style="margin-top:14px; display:flex; gap:12px;">
      <button class="button" (click)="save()">Save Feature</button>
      <button class="button" style="background:#22c55e" (click)="load()">Load</button>
    </div>
    <p *ngIf="message">{{message}}</p>
  </div>
  `
})
export class FeaturesPageComponent {
  model:any = { feature: 'Make_model_list', protect_product_id: '', Name: '' };
  deviceSkuCsv = '';
  message = '';
  constructor(private api: ApiService) {}
  save(){
    const body = { ...this.model, device_sku: this.deviceSkuCsv.split(',').map(s=>s.trim()).filter(Boolean) };
    this.api.upsertFeature(body).subscribe({
      next: () => this.message = 'Saved',
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
  load(){
    if(!this.model.protect_product_id){ this.message='Provide protect_product_id'; return; }
    this.api.getFeatures(this.model.protect_product_id).subscribe({
      next: (res:any) => { this.deviceSkuCsv = (res?.device_sku||[]).join(','); this.message='Loaded'; },
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
}
