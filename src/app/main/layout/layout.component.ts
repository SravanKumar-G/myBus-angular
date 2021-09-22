import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ApiUrls} from '../../_helpers/apiUrls';
import {ApiServiceService} from '../../services/api-service.service';

declare var jQuery: any;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    currentUser: any;
    public currentUserDetails: any = {};

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private apiServiceService: ApiServiceService,
                private apiUrls: ApiUrls) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
        });
    }

    // @ts-ignore
    getUserRoleValue(key: string | number): string | undefined {
        return this.apiServiceService.getUserRoleValue(key);
    }

    logOutUser(): void {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
    }

    ngOnInit(): void {
        this.currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        (($) => {
            // tslint:disable-next-line:typedef
            $(document).ready(() => {
                const treeViewMenu = $('.app-menu');
                const treeViewMenuChild = $('.app-menu-child');
                // Toggle Sidebar
                // tslint:disable-next-line:only-arrow-functions typedef
                $('[data-toggle="sidebar"]').click(function(event: { preventDefault: () => void; }) {
                    event.preventDefault();
                    $('.app').toggleClass('sidenav-toggled');
                });

                // Activate sidebar treeView toggle
                $('[data-toggle=\'treeView\']').click((event: { preventDefault: () => void; }) => {
                    event.preventDefault();
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
                });

                // Set initial active toggle
                $('[data-toggle=\'treeView.\'].is-expanded').parent().toggleClass('is-expanded');

                $('[data-toggle=\'treeView-child.\'].is-expanded').parent().toggleClass('is-expanded');

                $('[data-toggle=\'tooltip\']').tooltip();

                $('[data-toggle="popover"]').popover();

            });
        })(jQuery);
    }

    // @ts-ignore
    canAccessModule(moduleName: any): boolean {
        if (this.currentUserDetails && this.currentUserDetails.superAdmin) {
            return true;
        } else {
            if (this.currentUserDetails) {
                const accessibleModules = this.currentUserDetails.accessibleModules;
                console.log(accessibleModules, accessibleModules.indexOf(moduleName));
                return accessibleModules.indexOf(moduleName) !== -1;
            }
        }
    }
}
