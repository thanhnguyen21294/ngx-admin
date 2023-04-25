import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate, mapObjectData } from '../../@core/utils/format.service';
import { DataService } from '../../@core/service/data.service';
import { User } from '../../@core/models/user';
import { ToastrComponent } from '../../pages/modal-overlays/toastr/toastr.component';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ToastrComponent]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrComponent) { }

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

  ngOnInit(): void {
    this.createRegisterForm();
  }

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

  get formControls() {
    return this.registerForm.controls;
  }

  backToLogin() {
    this.router.navigate(["/login"])
  }

  onSubmit() {
    if (this.registerForm.status === "VALID") {
      this.registerForm.value.birthday = formatDate(this.registerForm.value.birthday);
      const data = mapObjectData<User>(this.registerForm.value, this.userData);
      this.dataService.post("/users", data).subscribe(response => {
        if (response) {
          this.toastr.makeToast('success', "Create user", "Create user success")
          this.createRegisterForm();
          setTimeout(() => this.backToLogin(), 2000);
        } else {
          this.toastr.makeToast('danger', "Create user", "Create user failed")
        }
      })
    } else {
      this.toastr.makeToast('warning', "Create user", "Form is not valid")
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
}
