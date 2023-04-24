import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageUserComponent } from "./manage-user.component";
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { AddOrEditModalModule } from "../../shared/AddOrEditModal/AddOrEdit.module";

const route: Routes = [{
  path: '',
  component: ManageUserComponent
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
    AddOrEditModalModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ManageUserComponent
  ]
})

export class ManageUserModule {}
