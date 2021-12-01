import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    filesToUpload: File | null = null;
    isDisabled = true;
    files: Array<any> = [];

    // get the data from (A) component
    @Input() refId: any;
    @Input() url: any;

    // return the data to (A) component
    @Output() imageToEmitToUpload = new EventEmitter<object>();
    public multiple: any;


    constructor(
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls
    ) {
    }

    ngOnInit(): void {}

    deleteImage(id: any, fileName: any): void {
        this.apiService.create(this.apiUrls.removeImage, {fileName, refId: id}).subscribe((res: any) => {
            if (res) {
                Swal.fire('success', 'File removed Successfully', 'success');
            }
        }, error => {
            this.files = [];
        });
    }


    handleFileInput(listOfFiles: any): void {
        const file = listOfFiles.target.files;
        this.files = file;
        if (file[0].type === 'application/pdf' || file[0].type === 'image/png' || file[0].type === 'image/jpeg') {
            this.filesToUpload = file;
            this.isDisabled = false;
        } else {
            Swal.fire('error', 'Please upload only PNG or JPEG or PDF files', 'error');
            this.files = [];
        }
    }


    fileUpload(): void {
      this.imageToEmitToUpload.emit({files: this.files, url: this.url});
      this.files = [];
    }

}
