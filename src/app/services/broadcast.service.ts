import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private currentUser$: Subject<any>;

// Computes the Current user from local storage and store it as initial value
  constructor() {
    const data = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    this.currentUser$ = new BehaviorSubject<any>(data);
  }

// Returns the observable (read-only) part of this subject
  getCurrentUser$(): Observable<any> {
    return this.currentUser$.asObservable();
  }

// Stores the updated current user value in local storage and pushes it to the subject
  setActiveCompany(data: any): void {
    localStorage.setItem('currentUserDetails', JSON.stringify(data));
    this.currentUser$.next(data);
  }
}
