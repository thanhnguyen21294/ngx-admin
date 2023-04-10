import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { RouterModule, Routes } from "@angular/router";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbCardModule } from "@nebular/theme";

const routes: Routes = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NbThemeModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbCardModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LoginComponent
  ]
})

export class LoginModule {}
