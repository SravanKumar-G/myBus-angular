import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';

@Component({
    selector: 'app-manage-roles',
    templateUrl: './manage-roles.component.html',
    styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
    public roles: Array<any> = [];
    public menus: Array<any> = [];
    public isEditable = false;
    public updateAllManagingRoles: Array<any> = [];

    constructor(
        private router: Router,
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls
    ) {
    }

    ngOnInit(): void {
        this.getAllRoles();
    }

    getAllRoles(): void {
        this.apiService.get(this.apiUrls.getAllRoles).subscribe((data: any) => {
            if (data) {
                this.roles = data.content;
                this.roles.forEach((role) => {
                    this.updateAllManagingRoles[role.name] = {id: role.id, name: role.name, menus: role.menus};
                    if (role.name === 'Admin') {
                        let i;
                        for (i = 0; i < role.menus.length; i++) {
                            this.menus.push({name: role.menus[i]});
                        }
                    }

                });
            }
        });
    }

    addOrRemovefromRoles(allowed: any, name: any, roleName: any): void {

    }

    updateRoles(): void {

    }

    editRoles(): void {
        this.isEditable = !this.isEditable;
    }
}
