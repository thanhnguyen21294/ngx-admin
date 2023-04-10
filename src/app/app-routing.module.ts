import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenRouterModule } from './authen/authen.routes';
@NgModule({
  imports: [AuthenRouterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
