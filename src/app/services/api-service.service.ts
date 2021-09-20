import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../_helpers/apiUrls';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  public currentUser: any;
  public fileName: any;
  public months: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'] | undefined;

  constructor(private http: HttpClient, public Apiurls: ApiUrls, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((userDetails: any) => {
      if (userDetails) {
        this.currentUser = userDetails;
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
        this.fileName = this.currentUser.fullName + '_' + months[new Date(this.currentUser.serverDate).getMonth()] + ','
          + new Date(this.currentUser.serverDate).getFullYear() + '_';
      }
    });
  }

  getUserRoleValue(key: string | number): string {
    console.log(key);
    if (key === 0) {
      return 'Admin';
    } else if (key === 5) {
      return 'Driver';
    } else if (key === 10) {
      return 'Driver And Associate';
    } else if (key === 15) {
      return 'Labourer';
    } else if (key === 19) {
      return 'Process Associate';
    } else if (key === 20) {
      return 'Site Supervisor';
    } else if (key === 26) {
      return 'Hub Manager';
    } else if (key === 25) {
      return 'Shift Lead';
    } else if (key === 28) {
      return 'Technology';
    } else if (key === 27) {
      return 'Finance';
    } else if (key === 28) {
      return 'Technology';
    } else if (key === 29) {
      return 'Central';
    } else if (key === 30) {
      return 'Cluster Manager';
    } else if (key === 31) {
      return 'Ops Manager';
    } else if (key === 35) {
      return 'City Manager';
    } else if (key === 40) {
      return 'Regional Manager';
    } else if (key === 45) {
      return 'Super User';
    } else if (key === 65) {
      return 'Employee';
    } else {
      return key as string;
    }
  }

  getUserShortRoleValue(key: string | number): string {
    if (key === 1) {
      return 'A';
    } else if (key === 5) {
      return 'D';
    } else if (key === 10) {
      return 'DDA';
    } else if (key === 15) {
      return 'L';
    } else if (key === 19) {
      return 'PA';
    } else if (key === 20) {
      return 'SS';
    }
      // else if(key ==21) {
      //     return "Process Associate";
    // }
    else if (key === 25) {
      return 'SL';
    } else if (key === 26) {
      return 'HM';
    } else if (key === 27) {
      return 'F';
    } else if (key === 28) {
      return 'T';
    } else if (key === 29) {
      return 'C';
    } else if (key === 30) {
      return 'CLM';
    } else if (key === 31) {
      return 'OM';
    } else if (key === 35) {
      return 'CM';
    } else if (key === 45) {
      return 'SU';
    } else if (key === 65) {
      return 'E';
    } else if (key === 40) {
      return 'RM';
    } else {
      return key as string;
    }
  }

  getServerRole(): any {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(x);
      return x;
    });
  }

  allBusinessUnits(): ({ name: string; value: string })[] {
    return [{value: 'SLSP', name: 'SLSP'}, {value: 'NODE', name: 'NODE'}];
  }

  allBusinessUnitsForFc(): ({ name: string; value: string })[] {
    return [{value: 'SLSP', name: 'SLSP'}, {value: 'NODE', name: 'NODE'}, {value: 'FC', name: 'FC'}];
  }

  public getAll = (subUrl: any, data: any) => {
    return this.http.post(this.Apiurls.mainUrl + subUrl, data);
  }

  public getCount = (subUrl: any, data: any) => {
    return this.http.post(this.Apiurls.mainUrl + subUrl, data);
  }

  public create = (subUrl: any, data: any) => {
    return this.http.post(this.Apiurls.mainUrl + subUrl, data).pipe( map((res: any) => {
      return res;
    }));
  }

  public get = (subUrl: any) => {
    return this.http.get(this.Apiurls.mainUrl + subUrl);
  }

  public update = (subUrl: any, data: any) => {
    return this.http.put(this.Apiurls.mainUrl + subUrl, data);
  }

  public delete = (subUrl: any) => {
    return this.http.delete(this.Apiurls.mainUrl + subUrl);
  }

  public unDelete = (subUrl: any, data: any) => {
    return this.http.put(this.Apiurls.mainUrl + subUrl, data);
  }

  public allData = (subUrl: any, data: any) => {
    return this.http.get(this.Apiurls.mainUrl + subUrl, data);
  }

  public upload = (subUrl: any, data: File) => {
    const formData: FormData = new FormData();
    formData.append('fileKey', data, data.name);
    return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
  }

  public uploadFile = (subUrl: any, data: any) => {
    const formData: FormData = new FormData();
    formData.append('file', data.file, data.name);
    formData.append('documentType', data.documentType);
    formData.append('clientId', data.clientId);
    return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
  }

  public uploadDocument = (subUrl: any, data: any) => {
    const formData: FormData = new FormData();
    formData.append('file', data.file, data.name);
    formData.append('documentType', data.documentType);
    formData.append('status', data.status);
    formData.append('issueDate', data.issueDate);
    formData.append('expirationDate', data.expirationDate);
    formData.append('siteId', data.siteId);
    return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
  }

  public imageUpload = (subUrl: any, data: File) => {
    const formData: FormData = new FormData();
    formData.append('fileKey', data, data.name);
    return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
  }

  public downloadPdf = (url: any, fileName: any) => {
    return this.http.get(this.Apiurls.mainUrl + url + '?name=' + fileName, {responseType: 'arraybuffer'});
  }
  public downloadPdfPost = (url: any, fileName: any) => {
    return this.http.post(this.Apiurls.mainUrl + url , fileName, {responseType: 'arraybuffer'});
  }

  public uploadPdf = (url: any, data: any) => {
    const formData: FormData = new FormData();
    formData.append('file', data);
    return this.http.post(this.Apiurls.mainUrl + url, formData, {responseType: 'arraybuffer'});
  }
}