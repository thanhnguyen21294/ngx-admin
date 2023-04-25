import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbInputModule, NbLayoutModule, NbRadioModule, NbThemeModule, NbToastrModule } from "@nebular/theme";
import { AddOrEditModalComponent } from "./AddOrEdit.component";
import { NotificationModule } from "../../../shared/notification/notification.module";
import { NbEvaIconsModule } from "@nebular/eva-icons";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NotificationModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbRadioModule,
    NbDatepickerModule,
    NbToastrModule,
  ],
  exports: [
    AddOrEditModalComponent
  ],
  declarations: [
    AddOrEditModalComponent
  ]
})

export class AddOrEditModalModule { }
