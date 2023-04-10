import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SYSTEM_CONSTANT } from '../../@core/constants/system.constant';
import { AuthService } from '../../@core/service/auth.service';
import { ToastrComponent } from '../../pages/modal-overlays/toastr/toastr.component';

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
  rememberMe = true;

  ngOnInit(): void {
    document.getElementById("errorLogin").className = "hidden error";
  }

  login() {
    this.authService.login(this.userName, this.passWord, this.rememberMe).pipe(
      catchError((error) => {
        this.toastr.makeToast('warning', 'Login', error);
        return throwError(error)
      })
    ).subscribe((response) => {
      if (response.id) {
        localStorage.setItem(SYSTEM_CONSTANT.USER_CURRENT, JSON.stringify(response));
        this.router.navigate(['pages']);
      }
    })
  }

  register() {
    this.router.navigate(['/register'])
  }

  forgotPassword() {
    this.router.navigate(['/forgotpassword'])
  }
}
