import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./generales/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./generales/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./maestros/accounts/accounts.module').then(
        (m) => m.AccountsModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./maestros/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
  },
  {
    path: 'dashboars',
    loadChildren: () =>
      import('./transactions/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./transactions/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
