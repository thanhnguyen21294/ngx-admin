import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { AuthGuard } from '../../@core/auth/auth.guard';
import { ChildAuthGuard } from '../../@core/auth/child-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'inputs',
        component: FormInputsComponent,
        canActivateChild: [ChildAuthGuard]
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
        canActivateChild: [ChildAuthGuard]
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
        canActivateChild: [ChildAuthGuard]
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        canActivateChild: [ChildAuthGuard]
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
        canActivateChild: [ChildAuthGuard]
      },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {
}

