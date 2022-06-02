import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {ApiUrls} from '../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {BroadcastService} from './broadcast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private apiUrls: ApiUrls,
              public service: BroadcastService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): string | null {
    return localStorage.getItem('currentUser');
  }

  // tslint:disable-next-line:typedef
  logIn(userName: string, password: string) {
    return this.http.post<any>(this.apiUrls.mainUrl + 'api/auth/signin', {userName, password}).pipe(map(response => {
      if (response) {
        Swal.fire('Success', 'Login Success', 'success');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        console.log(response);
        this.http.get(this.apiUrls.mainUrl + 'api/v1/user/me', {headers: {Authorization: `Bearer ${response.accessTokenaccessToken}`}}).subscribe((res: any) => {
          console.log('res', res);
          // this.currentUserDetails = res;
          this.service.setCurrentUser(res);
        });
      }
      return response;
    }));
  }

  logOut(): void {
    // @ts-ignore
    localStorage.clear('currentUser');
    // @ts-ignore
    localStorage.clear('currentUserDetails');
    this.currentUserSubject.next(null);
  }
}
