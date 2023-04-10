import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthenRouterModule } from "./authen.routes";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenRouterModule,
    LoginModule,
    RegisterModule,
    ForgotPasswordModule
  ],
})

export class AuthenModule { }
