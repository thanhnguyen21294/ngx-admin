import { Component, OnInit } from '@angular/core';
import { ToastrComponent } from '../../modal-overlays/toastr/toastr.component';
import { Products } from '../../../@core/models/products';
import { DataService } from '../../../@core/service/data.service';

@Component({
  selector: 'ngx-profit-detail',
  templateUrl: './profit-detail.component.html',
  styleUrls: ['./profit-detail.component.scss'],
  providers: [ToastrComponent]
})
export class ProfitDetailComponent implements OnInit {
  public products: Products[];

  constructor(private dataService: DataService, private toastr: ToastrComponent) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.get("/products").subscribe((res: Products[]) => {
      this.products = res;
      this.products = this.products.map(data => {
        data.name = `<i class="nb-checkmark text-danger"></i> ${data.name}`
        return data;
      })
    });
  }

  settings = {
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
        type: 'html',
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
