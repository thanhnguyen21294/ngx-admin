import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Custom1Component } from "./custom1.component";

const route: Routes = [{
    path: '',
    component: Custom1Component
  }]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    Custom1Component
  ]
})

export class Custom1Module {}
