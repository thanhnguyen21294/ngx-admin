import { NgModule } from "@angular/core";
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule  } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";
import { PaginationModule } from "../../shared/pagination/pagination.module";

const route: Routes = [{
  path: '',
  component: ProductsComponent
}]

@NgModule({
  imports: [
    RouterModule.forChild(route),
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    PaginationModule
  ],
  exports: [RouterModule],
  declarations: [ProductsComponent]
})

export class ProductsModule { }
