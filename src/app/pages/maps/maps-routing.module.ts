import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { BubbleMapComponent } from './bubble/bubble-map.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { MapComponent } from './search-map/map/map.component';
import { SearchComponent } from './search-map/search/search.component';
import { AuthGuard } from '../../@core/auth/auth.guard';
import { ChildAuthGuard } from '../../@core/auth/child-auth.guard';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'gmaps',
    component: GmapsComponent,
    canActivateChild: [ChildAuthGuard]
  }, {
    path: 'leaflet',
    component: LeafletComponent,
    canActivateChild: [ChildAuthGuard]
  }, {
    path: 'bubble',
    component: BubbleMapComponent,
    canActivateChild: [ChildAuthGuard]
  }, {
    path: 'searchmap',
    component: SearchMapComponent,
    canActivateChild: [ChildAuthGuard]
  }],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  GmapsComponent,
  LeafletComponent,
  BubbleMapComponent,
  SearchMapComponent,
  MapComponent,
  SearchComponent,
];
