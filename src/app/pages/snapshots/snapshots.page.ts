
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-snapshots-page', templateUrl: './snapshots.page.html' })
export class SnapshotsPageComponent {
  productId=''; data:any; message='';
  constructor(private api: ApiService){}
  load(){
    if(!this.productId){ this.message='Provide protect_product_id'; return; }
    this.api.getSnapshots(this.productId).subscribe({ next: (res:any)=>{ this.data=res; this.message='Loaded'; }, error: (e:any)=> this.message='Error: ' + (e?.error?.detail||e.message) });
  }
}
