import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { Subscription } from "rxjs";
import { Products } from "../../../@core/models/products";
import { DataService } from "../../../@core/service/data.service";
import { getRandomNumber } from "../../../@core/utils/utils.service";

@Component({
  selector: "ngx-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public products: Products[];
  multi: any[]

  showLegend: boolean = true;
  showLabels: boolean = true;
  showAnimations: boolean = true;
  legendTitle: string = "Product List";
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = "Year";
  yAxisLabel: string = "Sale Quants";
  timeline: boolean = true;
  gradient: boolean = true;

  colorScheme: any;
  themeSubscription: Subscription;

  results = [];
  lineChartData: any[];

  constructor(private dataService: DataService, private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [
          colors.primaryLight,
          colors.infoLight,
          colors.successLight,
          colors.warningLight,
          colors.dangerLight,
        ],
      };
    });
  }

  mapDataForLineChart(dataList: Products[]): any {
    let mapData = dataList.map((val) => {
      return {
        name: val.name,
        series: [
          {
            name: "2020",
            value: getRandomNumber(1, 10000),
          },
          {
            name: "2021",
            value: getRandomNumber(1, 10000),
          },
          {
            name: "2022",
            value: getRandomNumber(1, 10000),
          },
          {
            name: "2023",
            value: getRandomNumber(1, 10000),
          },
        ],
      };
    });
    return mapData;
  }

  onSelect(event) {
    console.log(event);
  }

  onActivate(event) {
    console.log(event);
  }

  onDeactivate(event) {
    console.log(event);
  }

  loadData() {
    this.dataService.get("/products").subscribe((res: Products[]) => {
      if (res) {
        this.products = res;
        this.results = [
          ...this.products.map((value) => {
            return {
              name: value.name,
              value: value.quantity,
            };
          }),
        ];
        this.lineChartData = this.mapDataForLineChart(res);
        console.log(this.lineChartData);
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
