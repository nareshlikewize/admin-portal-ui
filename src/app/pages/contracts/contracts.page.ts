
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contracts-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Contracts & Pricing</h2>
    <div class="grid grid-2">
      <div>
        <label>Protect Product ID</label>
        <input class="input" [(ngModel)]="model.protect_product_id" />
      </div>
      <div>
        <label>Contract Type</label>
        <select class="input" [(ngModel)]="model.contract_type">
          <option>Pricing</option>
          <option>ClaimLimit</option>
        </select>
      </div>
    </div>
    <label>Payload (JSON)</label>
    <textarea class="input" rows="10" [(ngModel)]="model.payloadText"></textarea>
    <div style="margin-top:14px; display:flex; gap:12px;">
      <button class="button" (click)="save()">Save Contract</button>
      <button class="button" style="background:#22c55e" (click)="load()">Load</button>
    </div>
    <p *ngIf="message">{{message}}</p>
  </div>
  `
})
export class ContractsPageComponent {
  model: any = { protect_product_id: '', contract_type: 'Pricing', payloadText: '{
  "pricing": { "pricing": [] }
}' };
  message = '';
  constructor(private api: ApiService) {}
  save(){
    let body:any = { contract_type: this.model.contract_type, protect_product_id: this.model.protect_product_id };
    try { body = { ...body, **JSON.parse(this.model.payloadText) }; } catch(e){ this.message='Invalid JSON'; return; }
    this.api.upsertContract(body).subscribe({
      next: () => this.message = 'Saved! Snapshot generated.',
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
  load(){
    if(!this.model.protect_product_id){ this.message='Provide protect_product_id'; return; }
    this.api.getContracts(this.model.protect_product_id).subscribe({
      next: (res:any) => { this.model.payloadText = JSON.stringify(res, null, 2); this.message='Loaded'; },
      error: err => this.message = 'Error: ' + (err?.error?.detail || err.message)
    });
  }
}
