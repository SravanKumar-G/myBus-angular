import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  public static serviceIncomeFilters: any = {};
  constructor() { }

  static setIncomeFilters(value: any): any {
    this.serviceIncomeFilters = value;
  }

  static getIncomeFilters(): any {
    return this.serviceIncomeFilters;
  }
}
