import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {query} from '@angular/animations';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-agents',
    templateUrl: './agents.component.html',
    styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
    headline: any = 'Agents';
    invalidCount: any;
    public agent: any = {};
    currentPageOfAgents: Array<any> = [];
    showInvalid = false;
    query = '';
    public agentsCount: any;
    public errorMessage: any;
    sortOrder = 'username';
    orderBy = 'asc';
    agentsQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        orderBy: 'asc',
        sortOrder: 'username',
        sort: this.sortOrder + ',' + this.orderBy,
    };

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private modalService: NgbModal, ) {
    }

    ngOnInit(): void {
        this.getCount(this.showInvalid);
    }

    getAllAgents(): void {
        this.apiService.get(this.apiUrls.getAllAgents +
            '?query=' + this.query +
            '&showInvalid=' + this.showInvalid +
            '&page=' + this.agentsQuery.page +
            '&size=' + this.agentsQuery.size +
            '&sort=' + this.agentsQuery.sort).subscribe((res: any) => {
            if (res) {
                this.currentPageOfAgents = res.content;
            } else {
                Swal.fire('Oops...', 'error retrieving agents!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    getCount(showInvalid: any): void {
        this.showInvalid = showInvalid;
        if (!showInvalid || showInvalid.trim().length === 0) {
            showInvalid = false;
        }
        this.apiService.get(this.apiUrls.getAgentsCount + '?query=' + this.query + '&showInvalid=' + this.showInvalid)
            .subscribe((res: any) => {
            if (res || res === 0) {
                this.agentsCount = res;
                OnlynumberDirective.pagination(res, this.agentsQuery);
                this.getAllAgents();
            } else {
                Swal.fire('Oops...', 'error retrieving route count!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    addAgent(): void {
        this.apiService.getAll(this.apiUrls.addAgent, this.agent).subscribe((res: any) => {
            if (res || res === 0) {
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    editAgent(agentId: any): void {
        this.router.navigate(['add-edit-agent', {id: agentId}]);
    }

    search(): void {
        this.getCount(this.showInvalid);
    }

    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.agentsQuery);
        this.getCount(this.showInvalid);
    }

    handlePageChange(event: number): void {
        this.agentsQuery.page = event;
        this.getCount(this.showInvalid);
    }

    handlePageSizeChange(event: any): void {
        this.agentsQuery.size = event;
        this.agentsQuery.page = 1;
        this.getCount(this.showInvalid);
    }

}
