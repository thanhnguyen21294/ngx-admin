import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { Subscription, throwError } from "rxjs";
import { Products } from "../../../@core/models/products";
import { getRandomNumber } from "../../../@core/utils/utils.service";
import { ProductApiService } from "../../../@core/api/product-api.service";
import { catchError } from "rxjs/operators";
import { HttpResponse, HttpStatusCode } from "@angular/common/http";

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

  constructor(private productService: ProductApiService, private theme: NbThemeService) {
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
    this.productService.getDataForChart().pipe(
      catchError(err => {
        return throwError(err)
      })
    ).subscribe((res: HttpResponse<Products[]>) => {
      if (res.status == HttpStatusCode.Ok) {
        this.products = res.body;
        this.results = [
          ...this.products.map((value) => {
            return {
              name: value.name,
              value: value.quantity,
            };
          }),
        ];
        this.lineChartData = this.mapDataForLineChart(res.body);
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
