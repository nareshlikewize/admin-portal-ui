
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private cfg: any = { apiBaseUrl: 'http://localhost:8000' };
  get apiBaseUrl() { return this.cfg.apiBaseUrl; }
}
