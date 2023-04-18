import { Component, OnInit } from '@angular/core';
import { DataService } from '../../@core/service/data.service';
import { Products } from '../../@core/models/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrComponent } from '../modal-overlays/toastr/toastr.component';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ToastrComponent]
})
export class ProductsComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public products: Products[];

  constructor(private dataService: DataService, private toastr: ToastrComponent) { }

  ngOnInit(): void {
    this.dataService.get("/products").pipe(takeUntil(this.destroy$)).subscribe((res: Products[]) => {
      this.products = res;
    });
  }

  settings = {
    // mode: 'external',
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
      display: true,
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
      this.dataService.deleteById(`/products`, dataId).subscribe(response => {
        if (response) {
          this.toastr.makeToast('success', "Delete Product", "Delete success");
          event.confirm.resolve();
        } else {
          this.toastr.makeToast('danger', "Delete Product", "Delete failed")
        }
      });
    } else {
      this.toastr.makeToast('warning', "Delete Product", "Delete canceled")
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    const data = event.newData;
    if (window.confirm('Are you sure you want to create?')) {
      this.dataService.post(`/products`, data).subscribe(response => {
        if (response) {
          this.toastr.makeToast('success', "Create Product", "Create success");
          event.confirm.resolve();
        } else {
          this.toastr.makeToast('danger', "Create Product", "Create failed")
        }
      });
    } else {
      this.toastr.makeToast('warning', "Create Product", "Create canceled")
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    const data = event.newData;
    if (window.confirm('Are you sure you want to save?')) {
      this.dataService.put(`/products/${event.newData.id}`, data).subscribe(response => {
        if (response) {
          this.toastr.makeToast('success', "Edit Product", "Save success");
          event.confirm.resolve();
        } else {
          this.toastr.makeToast('danger', "Edit Product", "Save failed")
        }
      });
    } else {
      this.toastr.makeToast('warning', "Edit Product", "Save canceled")
      event.confirm.reject();
    }
  }
}
