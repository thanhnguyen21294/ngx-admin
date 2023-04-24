import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TYPE } from '../../@core/constants/type.constant';
import { ToastrComponent } from '../../pages/modal-overlays/toastr/toastr.component';
import { DataService } from '../../@core/service/data.service';
import { SelectService } from '../../@core/service/select.service';
import { AuthService } from '../../@core/service/auth.service';

@Component({
  selector: 'ngx-addoredit',
  templateUrl: './AddOrEdit.component.html',
  styleUrls: ['./AddOrEdit.component.scss'],
  providers: [ToastrComponent]
})
export class AddOrEditModalComponent {
  @Input() title: string;
  @Input() data: any;

  constructor(protected ref: NbDialogRef<AddOrEditModalComponent>, private toastr: ToastrComponent, private dataService: DataService,
    private _selectService: SelectService, private authService: AuthService) { }

  cancel() {
    this.toastr.makeToast('danger', "Cancel", "Canceled")
    this.ref.close();
  }

  submit() {
    if (this.data) {
      let newData = this.data.data;
      if (this.title === TYPE.UPDATE) {
        this.dataService.put(`/users/${newData.id}`, newData).subscribe(response => {
          if (response) {
            this.toastr.makeToast('success', "Update User", "Save success");
            this._selectService.notifyModified(newData.id);
          } else {
            this.toastr.makeToast('danger', "Update User", "Save failed")
          }
        });
      } else if (this.title === TYPE.DELETE) {
        this.dataService.deleteById(`/users`, newData.id).subscribe(response => {
          if (response) {
            this.toastr.makeToast('success', "Delete User", "Delete success");
            this._selectService.notifyModified(newData.id);
          } else {
            this.toastr.makeToast('danger', "Delete User", "Delete failed")
          }
        });
      }
    }
    this.ref.close();
  }

  getTitle(title: string): string {
    let titleText = "";
    if (title === TYPE.CREATE) {
      titleText = "Create User"
    } else if (title === TYPE.UPDATE) {
      titleText = "Update User"
    } else if (title === TYPE.DELETE) {
      titleText = "Delete User"
    }

    return titleText;
  }

  logout() {
    this.authService.logout();
  }
}
