import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDashboardComponent } from "./product-dashboard.component";
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfitDetailComponent } from "./profit-detail/profit-detail.component";

const route: Routes = [
  {
    path: "",
    component: ProductDashboardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(route),
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    ThemeModule,
    NbTabsetModule,
    NbAccordionModule,
    NbButtonModule
  ],
  exports: [RouterModule],
  declarations: [
    ProductDashboardComponent,
    ProductDetailComponent,
    ProfitDetailComponent
  ]
})
export class ProductDashboardModule {}
