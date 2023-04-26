import { Component, OnInit } from '@angular/core';
import { Products } from '../../@core/models/products';
import { ProductApiService } from '../../@core/api/product-api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SYSTEM_CONSTANT } from '../../@core/constants/system.constant';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NotificationComponent]
})
export class ProductsComponent implements OnInit {
  public products: Products[];
  totalItem: any
  pageIndex = SYSTEM_CONSTANT.pageIndex
  pageSize = SYSTEM_CONSTANT.pageDisplay
  pageDisplay = SYSTEM_CONSTANT.pageDisplay

  constructor(private productService: ProductApiService, private noti: NotificationComponent) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.get({ currentPage: this.pageIndex, itemsPerPage: this.pageSize }).subscribe((res: HttpResponse<Products[]>) => {
      if (res.status == HttpStatusCode.Ok) {
        this.products = res.body;
        this.totalItem = res.headers.get('X-Total-Count');
      }
    });
  }

  settings = {
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
      confirmCreate: 'Are you sure you want to create?',
      cancelCreate: 'Create cancelled',
    },
    pager: {
      display: false,
      perPage: 5,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        hide: true
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      status: {
        title: 'Mark for sale',
        type: 'boolean',
        hide: true
      }
    },
  };

  onDeleteConfirm(event): void {
    const dataId = event.data.id;
    if (window.confirm('Are you sure you want to delete?')) {
      this.productService.deleteById(dataId).pipe(
        catchError((err) => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.noti.makeToast('success', "Delete Product", "Delete success");
          event.confirm.resolve();
        } else {
          this.noti.makeToast('danger', "Delete Product", "Delete failed")
        }
      });
    } else {
      this.noti.makeToast('warning', "Delete Product", "Delete canceled")
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    const data = event.newData;
    if (window.confirm('Are you sure you want to create?')) {
      this.productService.post(data).pipe(
        catchError((err) => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.noti.makeToast('success', "Create Product", "Create success");
          event.confirm.resolve();
        } else {
          this.noti.makeToast('danger', "Create Product", "Create failed")
        }
      });
    } else {
      this.noti.makeToast('warning', "Create Product", "Create canceled")
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    const data = event.newData;
    if (window.confirm('Are you sure you want to save?')) {
      this.productService.patch(event.newData.id, data).pipe(
        catchError((err) => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.noti.makeToast('success', "Edit Product", "Save success");
          event.confirm.resolve();
        } else {
          this.noti.makeToast('danger', "Edit Product", "Save failed")
        }
      });
    } else {
      this.noti.makeToast('warning', "Edit Product", "Save canceled")
      event.confirm.reject();
    }
  }


  changePage(event) {
    this.pageIndex = event;
    this.loadData();
  }
}
