import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProductsModule } from './products/products.module';
import { ProductDashboardModule } from './product-dashboard/product-dashboard.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    // DashboardModule,
    // ECommerceModule,
    MiscellaneousModule,
    ProductsModule,
    ProductDashboardModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
