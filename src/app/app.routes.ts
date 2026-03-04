
import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products/products.page';
import { ContractsPageComponent } from './pages/contracts/contracts.page';
import { FeaturesPageComponent } from './pages/features/features.page';
import { SnapshotsPageComponent } from './pages/snapshots/snapshots.page';
import { UsersPageComponent } from './pages/users/users.page';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsPageComponent },
  { path: 'contracts', component: ContractsPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'snapshots', component: SnapshotsPageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '**', redirectTo: 'products' }
];
