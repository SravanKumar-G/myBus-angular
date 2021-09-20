import { Component, OnInit } from '@angular/core';
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
  public currentUserDetails: any;

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
    (($) => {
      // tslint:disable-next-line:typedef
      $(document).ready(() => {
        const treeviewMenu = $('.app-menu');
        const treeviewMenuChild = $('.app-menu-child');
        // Toggle Sidebar
        // tslint:disable-next-line:only-arrow-functions typedef
        $('[data-toggle="sidebar"]').click(function(event: { preventDefault: () => void; }) {
          event.preventDefault();
          $('.app').toggleClass('sidenav-toggled');
        });

        // Activate sidebar treeview toggle
        $('[data-toggle=\'treeview\']').click((event: { preventDefault: () => void; }) => {
          event.preventDefault();
          if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find('[data-toggle=\'treeview\']').parent().removeClass('is-expanded');
          }
          $(this).parent().toggleClass('is-expanded');
        });

        $('[data-toggle=\'treeview-child\']').click((event: { preventDefault: () => void; }) => {
          event.preventDefault();
          if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenuChild.find('[data-toggle=\'treeview-child\']').parent().removeClass('is-expanded');
          }
          $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $('[data-toggle=\'treeview.\'].is-expanded').parent().toggleClass('is-expanded');

        $('[data-toggle=\'treeview-child.\'].is-expanded').parent().toggleClass('is-expanded');

        $('[data-toggle=\'tooltip\']').tooltip();

        $('[data-toggle="popover"]').popover();

      });
    })(jQuery);
    this.getLoggedInUserDetails();
  }

  getLoggedInUserDetails(): void{
    if (this.currentUser.accessToken) {
      this.apiServiceService.get(this.apiUrls.getCurrentUser).subscribe((res: any) => {
       this.currentUserDetails = res;
      });
    }
  }

    // @ts-ignore
  canAccessModule(moduleName: any): boolean {
      if (this.currentUserDetails && this.currentUserDetails.superAdmin){
        return true;
      } else {
        if (this.currentUserDetails){
          const accessibleModules = this.currentUserDetails.accessibleModules;
          return accessibleModules.indexOf(moduleName) !== -1;
        }
      }
    }
}
