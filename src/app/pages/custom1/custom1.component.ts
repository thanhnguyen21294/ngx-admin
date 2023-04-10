import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-custom1',
  templateUrl: './custom1.component.html',
  styleUrls: ['./custom1.component.scss']
})
export class Custom1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("custom component")
  }

}
