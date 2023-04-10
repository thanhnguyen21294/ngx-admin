import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { Tab1Component, Tab2Component, TabsComponent } from './tabs/tabs.component';
import { AccordionComponent } from './accordion/accordion.component';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { AuthGuard } from '../../@core/auth/auth.guard';
import { ChildAuthGuard } from '../../@core/auth/child-auth.guard';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'stepper',
      component: StepperComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'list',
      component: ListComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'infinite-list',
      component: InfiniteListComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'accordion',
      component: AccordionComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'tabs',
      component: TabsComponent,
      children: [
        {
          path: '',
          redirectTo: 'tab1',
          pathMatch: 'full',
        },
        {
          path: 'tab1',
          component: Tab1Component,
          canActivateChild: [ChildAuthGuard]
        },
        {
          path: 'tab2',
          component: Tab2Component,
          canActivateChild: [ChildAuthGuard]
        },
      ],
      canActivateChild: [ChildAuthGuard]
    },
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
