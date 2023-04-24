import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule } from "@nebular/theme";
import { AddOrEditModalComponent } from "./AddOrEdit.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule
  ],
  exports: [
    AddOrEditModalComponent
  ],
  declarations: [
    AddOrEditModalComponent
  ]
})

export class AddOrEditModalModule { }
