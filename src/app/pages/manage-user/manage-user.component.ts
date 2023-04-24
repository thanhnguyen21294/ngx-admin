import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../@core/models/user';
import { DataService } from '../../@core/service/data.service';
import { NbDialogService } from '@nebular/theme';
import { AddOrEditModalComponent } from '../../shared/AddOrEditModal/AddOrEdit.component';
import { TYPE } from '../../@core/constants/type.constant';
import { Subscription } from 'rxjs';
import { SelectService } from '../../@core/service/select.service';

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnDestroy {
  users: User[];
  names: string[] = [];
  subscription: Subscription;

  constructor(private dataService: DataService, private dialogService: NbDialogService, private _selectService: SelectService) { }

  ngOnInit(): void {
    this.loadData();
    this.subscription = this._selectService.ModifiedUserObservable$.subscribe((res) => {
      if(res) {
        this.loadData();
      }
    })
  }

  loadData() {
    this.dataService.get("/users").subscribe((res: User[]) => {
      this.users = res;
    });
  }

  settings = {
    mode: 'external',
    actions: {
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    createConfirm: {
      confirmText: 'Create',
      cancelText: 'Cancel',
      confirmCreate: 'Are you sure you want to create new User ?',
      cancelCreate: 'Create cancelled',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        hide: true
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string'
      },
      username: {
        title: 'User Name',
        type: 'string',
        editable: false
      },
      password: {
        title: 'Password',
        type: 'string',
        editable: false
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      gender: {
        title: 'Gender',
        type: 'string',
        editable: false
      },

    },
  };

  onDeleteConfirm(event): void {
    this.openModal(TYPE.DELETE, event);
  }

  onCreateConfirm(event) {
    this.openModal(TYPE.CREATE, event);
  }

  onEditConfirm(event) {
    this.openModal(TYPE.UPDATE, event);
  }

  openModal(type: string, data: any) {
    this.dialogService.open(AddOrEditModalComponent, {
      context: {
        title: type,
        data: data
      }
    })
      .onClose.subscribe(name => name && this.names.push(name));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
