import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'football-pools',
        loadChildren: () => import('./pages/football-pools/football-pools.module').then(m => m.FootballPoolsModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'results',
        loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsModule)
      }
    ]
  },
  {
    path: 'admin',
    // canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
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
