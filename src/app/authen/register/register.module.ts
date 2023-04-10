import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register.component";
import { RouterModule, Routes } from "@angular/router";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbCardBodyComponent, NbCardComponent, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbToastrModule, NbCardModule } from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../../@core/service/data.service";

const routes: Routes = [{
  path: '',
  component: RegisterComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NbThemeModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbToastrModule,
    NbCardModule
  ],
  exports: [RouterModule],
  declarations: [
    RegisterComponent
  ],
  providers: [
    DataService
  ]
})

export class RegisterModule { }
