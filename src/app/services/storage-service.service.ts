import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  public static serviceIncomeFilters: any = {};
  public static serviceReportsByDate: any = {};
  public static tab = 1;
  constructor() { }

  static setIncomeFilters(value: any): any {
    this.serviceIncomeFilters = value;
  }

  static getIncomeFilters(): any {
    return this.serviceIncomeFilters;
  }

  static setServiceReports(value: any): any {
    this.serviceReportsByDate = value;
  }

  static setTabValue(value: any): any {
    this.tab = value;
  }

  static getTabValue(): any {
    return this.tab;
  }
}
