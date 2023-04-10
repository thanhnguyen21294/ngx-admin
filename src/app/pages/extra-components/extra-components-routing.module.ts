import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraComponentsComponent } from './extra-components.component';
import { AlertComponent } from './alert/alert.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit/calendar-kit.component';
import { AuthGuard } from '../../@core/auth/auth.guard';
import { ChildAuthGuard } from '../../@core/auth/child-auth.guard';

const routes: Routes = [{
  path: '',
  component: ExtraComponentsComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'calendar',
      component: CalendarComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'progress-bar',
      component: ProgressBarComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'spinner',
      component: SpinnerComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'alert',
      component: AlertComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'calendar-kit',
      component: CalendarKitFullCalendarShowcaseComponent,
      canActivateChild: [ChildAuthGuard]
    },
    {
      path: 'chat',
      component: ChatComponent,
      canActivateChild: [ChildAuthGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraComponentsRoutingModule {
}
