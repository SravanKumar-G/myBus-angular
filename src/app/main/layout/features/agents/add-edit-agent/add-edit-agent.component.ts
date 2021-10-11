import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';

@Component({
    selector: 'app-add-edit-agent',
    templateUrl: './add-edit-agent.component.html',
    styleUrls: ['./add-edit-agent.component.css']
})
export class AddEditAgentComponent implements OnInit {
    public agentId: any;
    public agentTitle = '';
    public branchOffices: Array<any> = [];
    public agent: any = {
        id: ' ',
    };
    public errorMessage: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute) {
        this.agentId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        this.loadBranchNames();
        if (this.agentId) {
            console.log('this.vendorExpenseId', this.agentId);
            this.agentTitle = 'Edit Agent';
            this.getAgentDetails();
        } else {
            this.agentTitle = 'Add Agent';
        }
    }

    goToDashboard(): void {
        this.router.navigate(['dashboard']);
    }

    loadBranchNames(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            this.branchOffices = res;
        });
    }

    saveAgent(): void {
        if (this.agentId) {
            this.apiService.update(this.apiUrls.updateAgent, this.agent).subscribe((res: any) => {
                if (res || res === 0) {
                    this.agent = res;
                }
                this.router.navigate(['agents']);
            }, error => {
                this.errorMessage = error.message;
            });
        }else {
            this.apiService.create(this.apiUrls.addAgent, this.agent).subscribe((res: any) => {
                if (res || res === 0) {
                    this.agent = res;
                }
                this.router.navigate(['agents']);
            }, error => {
                this.errorMessage = error.message;
                console.log(this.errorMessage);
            });
        }
    }
    getAgentDetails(): void {
        this.apiService.get(this.apiUrls.editAgent + this.agentId).subscribe((res: any) => {
            if (res) {
                this.agent = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    cancel(): void {
        this.router.navigate(['agents']);
    }
}
