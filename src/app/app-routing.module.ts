import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import { AuthClientGuard } from './guards/auth-client.guard';
import {LegalAgreementComponent} from './shared/components/legal-agreement/legal-agreement.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthClientGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'pools',
        loadChildren: () => import('./pages/pools-client/pools-client.module').then(m => m.PoolsClientModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'legal-agreement',
        component: LegalAgreementComponent,
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthClientGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'emails',
        loadChildren: () => import('./pages/emails/emails.module').then(m => m.EmailsModule)
      },
      {
        path: 'teams',
        loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsModule)
      },
      {
        path: 'sports',
        loadChildren: () => import('./pages/sports/sports.module').then(m => m.SportsModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'pools',
        loadChildren: () => import('./pages/pools/pools.module').then(m => m.PoolsModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./pages/admin-transactions/admin-transactions.module').then(m => m.AdminTransactionsModule)
      },
      {
        path: 'legal-agreement',
        component: LegalAgreementComponent,
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
