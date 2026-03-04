
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-products-page', templateUrl: './products.page.html' })
export class ProductsPageComponent {
  model:any = { protect_product_id: '', account_id: '', name: '', alias: '', AccountProductStatusType: 'Active', is_active: true, description: '' };
  message = '';
  constructor(private api: ApiService){}
  save(){
    this.api.upsertProduct(this.model).subscribe({ next: ()=> this.message='Saved! Snapshot generated.', error: (e:any)=> this.message = 'Error: ' + (e?.error?.detail||e.message)});
  }
  load(){
    if(!this.model.protect_product_id){ this.message='Provide protect_product_id'; return; }
    this.api.getProduct(this.model.protect_product_id).subscribe({ next: (res:any)=>{ this.model = { ...this.model, ...res }; this.message='Loaded'; }, error: (e:any)=> this.message='Error: ' + (e?.error?.detail||e.message) });
  }
}
