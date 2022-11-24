import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../_helpers/apiUrls';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {BroadcastService} from './broadcast.service';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {
    public currentUser: any;
    public fileName: any;
    public months: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'] | undefined;
    private currentUserDetails: any;
    newDate: any;
    urlDate = new Date();

    constructor(private http: HttpClient,
                public Apiurls: ApiUrls,
                public authenticationService: AuthenticationService,
                public service: BroadcastService) {
        this.newDate = new Date().getFullYear() + '-' + ('0' + (parseInt(String(new Date().getMonth() + 1)))).slice(-2)
            + '-' + ('0' + (new Date().getDate()));
        // console.log(this.newDate);
        this.authenticationService.currentUser.subscribe((userDetails: any) => {
            if (userDetails) {
                this.currentUser = userDetails;
            }
        });
    }


    getUserRoleValue(key: string | number): string {
        if (key === 0) {
            return 'Admin';
        } else {
            return key as string;
        }
    }

    getLoggedInUserData(): void {
        this.http.get(this.Apiurls.mainUrl + 'api/v1/user/me').subscribe((res: any) => {
            this.currentUserDetails = res;
            this.service.setCurrentUser(res);
        });
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

    // return date YYYY-M-D format
    getDate(date: any): any {
        if (date) {
            const dateObj = date;
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();
            const year = dateObj.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }

    public getAll = (subUrl: any, data: any) => {
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

    public upload = (subUrl: any, files: any) => {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[' + [i] + ']', files[i]);
        }
        return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
    }

    public fileUpload = (subUrl: any, files: any, id: any, type: any) => {
        const formData: FormData = new FormData();
        formData.append('id', id);
        formData.append('type', type);
        for (let i = 0; i < files.length; i++) {
            formData.append('files[' + [i] + ']', files[i]);
        }
        return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
    }

    public imageUpload = (subUrl: any, data: File) => {
        const formData: FormData = new FormData();
        formData.append('fileKey', data, data.name);
        return this.http.post(this.Apiurls.mainUrl + subUrl, formData);
    }

    public downloadPdfPost = (url: any, fileName: any) => {
        return this.http.post(this.Apiurls.mainUrl + url, fileName, {responseType: 'arraybuffer'});
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

    // return date YYYY-MM-DD format
    getYYYYMMDD(date: any): any {
        if (date) {
            const dateObj = new Date(date);
            const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
            const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
            const year = dateObj.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }

    // return date YYYY/MM/DD format
    getExpenesDate(date: any): any {
        if (date) {
            const dateObj = new Date(date);
            const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
            const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
            const year = dateObj.getFullYear();
            return year + '/' + month + '/' + day;
        }
    }

    //  Send WhatsApp message
    sendWhatsApp(mobile: any, sms: any): void {
        let phoneNumber = prompt('Phone Number', mobile);
        if (mobile.toString().length <= 10) { phoneNumber = '91' + mobile; }
        const textMessage = encodeURI(sms.replace('#', ':'));
        const URL = 'https://api.whatsapp.com/send/?phone=' + phoneNumber + '&text=' + textMessage + '&app_absent=0';
        window.open(URL);
    }
}
