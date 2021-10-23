import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ApiServiceService} from '../../services/api-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var jQuery: any;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    currentUser: any;
    public currentUserDetails: any = {};
    public currentDate = new Date();
    public newDate: any;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private apiService: ApiServiceService,
                private modalService: NgbModal) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
        });
    }

    // @ts-ignore
    getUserRoleValue(key: string | number): string | undefined {
        return this.apiService.getUserRoleValue(key);
    }

    logOutUser(): void {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
    }

    ngOnInit(): void {
        this.newDate = new Date().getFullYear() + '-' + ('0' + (parseInt(String(new Date().getMonth() + 1)))).slice(-2)
            + '-' + ('0' + (new Date().getDate() - 1)).slice(-2);
        this.currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        (($) => {
            // tslint:disable-next-line:typedef
            $(document).ready(() => {
                const treeViewMenu = $('.app-menu');
                const treeViewMenuChild = $('.app-menu-child');
                // Toggle Sidebar
                $('[data-toggle="sidebar"]').click((event: any) => {
                    event.preventDefault();
                    $('.app').toggleClass('sidenav-toggled');
                });

                // Activate sidebar treeView toggle
                $('[data-toggle=\'treeView\']').click((event: { preventDefault: () => void; }) => {
                    event.preventDefault();
                    console.log(event, '==>');
                    if (!$(this).parent().hasClass('is-expanded')) {
                        treeViewMenu.find('[data-toggle=\'treeView\']').parent().removeClass('is-expanded');
                    }
                    $(this).parent().toggleClass('is-expanded');
                });

                $('[data-toggle=\'treeView-child\']').click((event: { preventDefault: () => void; }) => {
                    event.preventDefault();
                    if (!$(this).parent().hasClass('is-expanded')) {
                        treeViewMenuChild.find('[data-toggle=\'treeView-child\']').parent().removeClass('is-expanded');
                    }
                    $(this).parent().toggleClass('is-expanded');
                    console.log( $(this).parent().toggleClass('is-expanded'));
                });

                // Set initial active toggle
                $('[data-toggle=\'treeView.\'].is-expanded').parent().toggleClass('is-expanded');

                $('[data-toggle=\'treeView-child.\'].is-expanded').parent().toggleClass('is-expanded');

                $('[data-toggle=\'tooltip\']').tooltip();

                $('[data-toggle="popover"]').popover();

            });
        })(jQuery);

        // setTimeout(() => {
        //    this.modalService.open('reminderModal');
        // }, 3000);

        // setTimeout(() => {
        //     this.modalService.dismissAll();
        // }, 35000);
    }

    // @ts-ignore
    canAccessModule(moduleName: any): boolean {
        if (this.currentUserDetails && this.currentUserDetails.superAdmin) {
            return true;
        } else {
            if (this.currentUserDetails) {
                const accessibleModules = this.currentUserDetails.accessibleModules;
                // console.log(accessibleModules, accessibleModules.indexOf(moduleName));
                return accessibleModules.indexOf(moduleName) !== -1;
            }
        }
    }
}
