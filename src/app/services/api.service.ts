
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../core/app-config.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private cfg: AppConfigService) {}
  get base() { return this.cfg.apiBaseUrl; }

  // Products
  getProducts() { return this.http.get(`${this.base}/products`); }
  getProduct(id: string) { return this.http.get(`${this.base}/products/${id}`); }
  upsertProduct(body: any) { return this.http.put(`${this.base}/products`, body); }

  // Contracts
  getContracts(productId: string) { return this.http.get(`${this.base}/contracts/${productId}`); }
  upsertContract(body: any) { return this.http.put(`${this.base}/contracts`, body); }

  // Features
  getFeatures(productId: string) { return this.http.get(`${this.base}/features/${productId}`); }
  upsertFeature(body: any) { return this.http.put(`${this.base}/features`, body); }

  // Snapshots
  getSnapshots(productId: string) { return this.http.get(`${this.base}/snapshots/${productId}`); }
}
