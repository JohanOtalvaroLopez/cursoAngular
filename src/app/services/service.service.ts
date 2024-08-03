import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  gbolSignUp: boolean = false;
  txtUser: string = '';

  constructor() {}
}
