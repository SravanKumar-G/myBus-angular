import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {
    AddEditOfficeExpenseComponent
} from "../../reports/office-expenses/add-edit-office-expense/add-edit-office-expense.component";

@Component({
    selector: 'app-files-upload',
    templateUrl: './files-upload.component.html',
    styleUrls: ['./files-upload.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class FilesUploadComponent implements OnInit {

    filesToUpload: File | null = null;
    listOfImages: Array<any> = [];
    isDisabled = true;
    files: Array<any> = [];

    // get the data from (A) component
    @Input() refId: any;
    @Input() type: any;
    // return the data to (A) component
    @Output() imageToEmitToUpload = new EventEmitter<number>();
    public multiple: any;
    // @ViewChild(AddEditOfficeExpenseComponent) AddEditOfficeExpenseChild !: any;


    constructor(
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        // private addEditExpensesComp: AddEditOfficeExpenseComponent
    ) {
    }

    ngOnInit(): void {
        if (this.refId) {
            this.getUploads(this.refId);
        }
    }

    getUploads(id: any): void {
        this.apiService.get(this.apiUrls.getUploads + id).subscribe((res: any) => {
            if (res) {
                this.listOfImages = res;
            }
        });
    }

    deleteImage(id: any, fileName: any): void {
        this.apiService.create(this.apiUrls.removeImage, {fileName, refId: id}).subscribe((res: any) => {
            if (res) {
                Swal.fire('success', 'File removed Successfully', 'success');
                this.getUploads(id);
            }
        }, error => {
            this.getUploads(id);
            this.files = [];
        });
    }


    handleFileInput(listOfFiles: any): void {
            const files = listOfFiles.target.files;
            this.files = files;
            for (const file of files) {
                if (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpeg') {
                    this.filesToUpload = files;
                    this.isDisabled = false;
                } else {
                    Swal.fire('error', 'Please upload only PNG or JPEG or PDF files', 'error');
                    this.files = [];
                }
            }
    }


    fileUpload(): void {
        let uploadUrl = this.apiUrls.fileUpload;
        if (this.type === 'OfficeExpense' ) {
            uploadUrl = 'api/v1/officeExpense/uploadFiles/' + this.refId;
        }
        this.apiService.fileUpload(uploadUrl, this.files, this.refId, this.type).subscribe((res: any) => {
            if (res) {
                this.getUploads(this.refId);
                this.imageToEmitToUpload.emit(200);
                // this.addEditExpensesComp.getExpenseDetails();
                Swal.fire('Wow!', 'File uploaded Successfully', 'success');
                this.files = [];
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }
}
