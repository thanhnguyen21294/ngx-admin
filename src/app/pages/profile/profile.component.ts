import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { UserApiService } from '../../@core/api/user-api.service';
import { AuthService } from '../../@core/service/auth.service';
import { throwError } from 'rxjs';
import { SYSTEM_CONSTANT } from '../../@core/constants/system.constant';
import { User } from '../../@core/models/user';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NotificationComponent]
})
export class ProfileComponent implements OnInit {
  public user: User;
  authUser: any;

  constructor(private noti: NotificationComponent, private userService: UserApiService, private authService: AuthService) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SYSTEM_CONSTANT.USER_CURRENT));
  }

  submit() {
    this.userService.patch(this.user.id.toString(), this.user).pipe(
      catchError(error => {
        return throwError(error)
      })
    ).subscribe(response => {
      if (response) {
        // this.authService.setUser(this.user);
        localStorage.setItem(SYSTEM_CONSTANT.USER_CURRENT, JSON.stringify(this.user));
        this.noti.makeToast('success', "Update User", "Save success");
      } else {
        this.noti.makeToast('danger', "Update User", "Save failed")
      }
    });
  }
}
