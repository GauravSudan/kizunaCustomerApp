import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/warrantyverification' },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   data: {
  //     layout: 'modern'
  //   },
  //   children: [
  //     { path: 'warrantyverification', loadChildren: () => import('src/app/modules/home/plan.module').then(m => m.PlanModule) },
  //   ]
  // },
  {
    path: '',
    component: LayoutComponent,  
    data: {
      layout: 'modern'
    },
    children: [
      { path: 'warrantyverification', loadChildren: () => import('src/app/modules/plan/start/start.module').then(m => m.StartModule) },
    ]
  },
  {
    path: '',
    component: LayoutComponent, 
    data: {
      layout: 'modern'
    },
    children: [
      { path: 'warrantyverification', loadChildren: () => import('src/app/modules/subscription/subscription.module').then(m => m.SubscriptionModule) },
    ]
  }
];