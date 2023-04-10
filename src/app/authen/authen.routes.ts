import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../@core/auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import("../authen/login/login.module").then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import("../authen/register/register.module").then(m => m.RegisterModule) },
  { path: 'forgotpassword', loadChildren: () => import("../authen/forgot-password/forgot-password.module").then(m => m.ForgotPasswordModule) },
  {
    path: 'pages',
    loadChildren: () => import('../pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AuthenRouterModule { }
