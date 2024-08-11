import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  gbolSignUp: boolean = false;
  txtUser: string = '';

  private ResSubjet = new Subject<any>();
  public ResObserver$ = this.ResSubjet.asObservable();

  constructor() {}

  fnSetResObserver(pvstrObserver: any) {
    this.ResSubjet.next(pvstrObserver);
  }
}
