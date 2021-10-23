import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../_helpers/apiUrls';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {any} from 'codelyzer/util/function';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {
    public currentUser: any;
    public fileName: any;
    public months: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'] | undefined;

    constructor(private http: HttpClient,
                public Apiurls: ApiUrls,
                public authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe((userDetails: any) => {
            if (userDetails) {
                this.currentUser = userDetails;
            }
        });
    }

    getUserRoleValue(key: string | number): string {
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


    getAllStates(): ({ displayName: string; value: string })[] {
        return [
            {value: 'AP', displayName: 'Andhra Pradesh'},
            {value: 'KA', displayName: 'Karnataka'},
            {value: 'MH', displayName: 'Maharastra'},
            {value: 'TN', displayName: 'Tamilnadu'},
            {value: 'TS', displayName: 'Telangana'}
        ];
    }

    getDate(date: any): any {
        const dateObj = date;
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return year + '-' + month + '-' + day;
    }

    public getAll = (subUrl: any, data: any) => {
        return this.http.post(this.Apiurls.mainUrl + subUrl, data);
    }

    public getCount = (subUrl: any, data: any) => {
        return this.http.post(this.Apiurls.mainUrl + subUrl, data);
    }

    public create = (subUrl: any, data: any) => {
        return this.http.post(this.Apiurls.mainUrl + subUrl, data).pipe(map((res: any) => {
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

    public FileUpload = (subUrl: any, data: any, id: any) => {
        console.log('7', data[0].name);
        // formData.append('id', id);
        // formData.append('type', 'ExpenseType');
        // formData.append('files[0]', data[0].name);
        return this.http.post(this.Apiurls.mainUrl + subUrl, data);
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
        return this.http.post(this.Apiurls.mainUrl + url, fileName, {responseType: 'arraybuffer'});
    }

    public uploadPdf = (url: any, data: any) => {
        const formData: FormData = new FormData();
        formData.append('file', data);
        return this.http.post(this.Apiurls.mainUrl + url, formData, {responseType: 'arraybuffer'});
    }

    exportExcel(tableId: string, xlfileName: any, col1: any, col2: any): void {
        const element = document.getElementById(tableId);
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
        ws['!cols'] = [];
        ws['!cols'][col1] = {hidden: true};
        ws['!cols'][col2] = {hidden: true};
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, xlfileName + '.xlsx');
    }
}
