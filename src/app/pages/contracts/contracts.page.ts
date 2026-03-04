
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-contracts-page', templateUrl: './contracts.page.html' })
export class ContractsPageComponent {
  model: any = { protect_product_id: '', contract_type: 'Pricing', payloadText: '{
  "pricing": { "pricing": [] }
}' };
  message = '';
  constructor(private api: ApiService){}
  save(){
    let body:any = { contract_type: this.model.contract_type, protect_product_id: this.model.protect_product_id };
    try { body = { ...body, ...JSON.parse(this.model.payloadText) }; } catch(e){ this.message='Invalid JSON'; return; }
    this.api.upsertContract(body).subscribe({ next: ()=> this.message='Saved! Snapshot generated.', error: (e:any)=> this.message='Error: ' + (e?.error?.detail||e.message) });
  }
  load(){
    if(!this.model.protect_product_id){ this.message='Provide protect_product_id'; return; }
    this.api.getContracts(this.model.protect_product_id).subscribe({ next: (res:any)=>{ this.model.payloadText = JSON.stringify(res, null, 2); this.message='Loaded'; }, error: (e:any)=> this.message='Error: ' + (e?.error?.detail||e.message) });
  }
}
