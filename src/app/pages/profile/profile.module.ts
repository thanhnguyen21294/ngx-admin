import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { RouterModule, Routes } from "@angular/router";
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { FormsRoutingModule } from "../forms/forms-routing.module";
import { FormsModule } from "@angular/forms";

const route: Routes = [{
  path: '',
  component: ProfileComponent
}]

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(route),
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule
  ],
  exports: [RouterModule],
  declarations: [
    ProfileComponent
  ]
})

export class ProfileModule { }
