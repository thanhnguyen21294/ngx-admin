import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../@core/service/auth.service';
import { ToastrComponent } from '../../pages/modal-overlays/toastr/toastr.component';
import { User } from '../../@core/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, ToastrComponent]
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrComponent
  ) { }

  public userName: string = '';
  public passWord: string = '';
  currentUser: User;

  ngOnInit(): void {
    console.log("log in")
  }

  login() {
    this.authService.login(this.userName, this.passWord).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.makeToast('warning', 'Login', 'Unauthorized');
        }
        this.toastr.makeToast('warning', 'Login', error.error.message);
        return throwError(error)
      })
    ).subscribe(response => {
      this.authService.setUser(response);
      setTimeout(() => this.router.navigate(['pages']), 500);
    })
  }

  register() {
    this.router.navigate(['/register'])
  }

  forgotPassword() {
    this.router.navigate(['/forgotpassword'])
  }
}
