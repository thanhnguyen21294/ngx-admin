import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/auth/auth.guard';
import { ChildAuthGuard } from '../@core/auth/child-auth.guard';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    //   canActivate: [AuthGuard]
    // },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    //   canActivate: [AuthGuard]
    // },
    // {
    //   path: 'products',
    //   loadChildren: () => import("./products/products.module").then(m => m.ProductsModule),
    //   canActivate: [AuthGuard]
    // },
    {
      path: 'products-dashboard',
      loadChildren: () => import("./product-dashboard/product-dashboard.module").then(m => m.ProductDashboardModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
        canActivateChild: [ChildAuthGuard]
    },
    {
      path: '',
      redirectTo: 'products-dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
