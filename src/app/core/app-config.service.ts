
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private cfg: any = { apiBaseUrl: 'https://backend-production-615b.up.railway.app' };
  get apiBaseUrl() { return this.cfg.apiBaseUrl; }
}
