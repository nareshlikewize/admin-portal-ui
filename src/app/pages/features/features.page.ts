
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-features-page', templateUrl: './features.page.html' })
export class FeaturesPageComponent {
  model:any = { feature: 'Make_model_list', protect_product_id: '', Name: '' };
  deviceSkuCsv = '';
  message = '';
  constructor(private api: ApiService){}
  save(){
    const body = { ...this.model, device_sku: this.deviceSkuCsv.split(',').map(s=>s.trim()).filter(Boolean) };
    this.api.upsertFeature(body).subscribe({ next: ()=> this.message='Saved', error: (e:any)=> this.message='Error: ' + (e?.error?.detail||e.message) });
  }
  load(){
    if(!this.model.protect_product_id){ this.message='Provide protect_product_id'; return; }
    this.api.getFeatures(this.model.protect_product_id).subscribe({ next: (res:any)=>{ const first=(res&&res[0])||{}; this.deviceSkuCsv=(first.device_sku||[]).join(','); this.message='Loaded'; }, error: (e:any)=> this.message='Error: ' + (e?.error?.detail||e.message) });
  }
}
