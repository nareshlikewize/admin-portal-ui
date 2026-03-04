
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfig {
  apiBaseUrl = '';
}

export function loadAppConfig(http: HttpClient, cfg: AppConfig){
  return () => new Promise<void>((resolve) => {
    http.get<any>('assets/config.json').subscribe({
      next: (data) => { cfg.apiBaseUrl = data?.apiBaseUrl || ''; resolve(); },
      error: () => { cfg.apiBaseUrl = ''; resolve(); }
    });
  });
}
