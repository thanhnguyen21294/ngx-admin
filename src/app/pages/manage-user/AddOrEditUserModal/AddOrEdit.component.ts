import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TYPE } from '../../../@core/constants/type.constant';
// import { ToastrComponent } from '../../pages/modal-overlays/noti/noti.component';
import { SelectService } from '../../../@core/service/select.service';
import { AuthService } from '../../../@core/service/auth.service';
import { NotificationComponent } from '../../../shared/notification/notification.component';
import { UserApiService } from '../../../@core/api/user-api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../@core/models/user';
import { formatDate, mapObjectData } from '../../../@core/utils/format.service';

@Component({
  selector: 'ngx-addoredit',
  templateUrl: './AddOrEdit.component.html',
  styleUrls: ['./AddOrEdit.component.scss'],
  providers: [NotificationComponent]
})
export class AddOrEditModalComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({});
  @Input() title: string;
  @Input() data: any;

  userName = '';
  passWord = '';
  public userData: Partial<User> = {
    avatar: "",
    birthday: "",
    email: "",
    firstName: "",
    gender: "",
    lastName: "",
    password: "",
    phone: "",
    status: false,
    username: ""
  };

  genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  constructor(protected ref: NbDialogRef<AddOrEditModalComponent>, private noti: NotificationComponent, private userService: UserApiService,
    private _selectService: SelectService, private formBuilder: FormBuilder) { }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      avatar: ["https://robohash.org/accusantiumminimamagni.png?size=50x50&set=set1"],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]],
      birthday: ['', Validators.required],
      status: [false]
    }, {
      validators: this.validatePassword
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.data) {
      let newData = this.data.data;
      if (this.title === TYPE.UPDATE) {
        this.userService.put(newData.id, newData).pipe(
          catchError(error => {
            return throwError(error)
          })
        ).subscribe(response => {
          if (response) {
            this.noti.makeToast('success', "Update User", "Save success");
            this._selectService.notifyModified(newData.id);
          } else {
            this.noti.makeToast('danger', "Update User", "Save failed")
          }
        });
      } else if (this.title === TYPE.DELETE) {
        this.userService.deleteById(newData.id).pipe(
          catchError(error => {
            return throwError(error)
          })
        ).subscribe(response => {
          if (response) {
            this.noti.makeToast('success', "Delete User", "Delete success");
            this._selectService.notifyModified(newData.id);
          } else {
            this.noti.makeToast('danger', "Delete User", "Delete failed")
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

  get formControls() {
    return this.registerForm.controls;
  }

  submitCreateUser() {
    if (this.registerForm.status === "VALID") {
      this.registerForm.value.birthday = formatDate(this.registerForm.value.birthday);
      const data = mapObjectData<User>(this.registerForm.value, this.userData);
      this.userService.post(data).pipe(
        catchError(err => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.noti.makeToast('success', "Create user", "Create user success")
          this._selectService.notifyModified(response.id);
          this.createRegisterForm();
          this.ref.close();
        } else {
          this.noti.makeToast('danger', "Create user", "Create user failed")
        }
      })
    } else {
      this.noti.makeToast('warning', "Create user", "Form is not valid")
      this.validateAllFormFields(this.registerForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  validatePassword(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }
}
