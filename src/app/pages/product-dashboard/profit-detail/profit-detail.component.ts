import { Component, OnInit } from '@angular/core';
import { ToastrComponent } from '../../modal-overlays/toastr/toastr.component';
import { Products } from '../../../@core/models/products';
import { DataService } from '../../../@core/service/data.service';

@Component({
  selector: 'ngx-profit-detail',
  templateUrl: './profit-detail.component.html',
  styleUrls: ['./profit-detail.component.scss']
})
export class ProfitDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
