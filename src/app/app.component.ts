import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { ServiceService } from './services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MY APP BANK';
  lbolUserLogu: boolean = false;
  lstrUser: string = 'Robin';
  lstrPass: string = '1234';
  lstrMessag: string = '';

  constructor(private apiService: DataService, public service: ServiceService, private router: Router){}

  fnLogIN() {
    this.apiService.fnValiUser(this.lstrUser, this.lstrPass).subscribe({
      next: (res) => {
        if (res[0].Status == 'OK') {
          this.lbolUserLogu = true;
          this.lstrMessag = '';
          this.service.txtUser = this.lstrUser;
          this.router.navigate(['home']);
        } else {
          this.lbolUserLogu = false;
          this.lstrMessag = res[0].NombUsua;
          window.alert(res[0].NombUsua);
        }
      },
    });
  }

  fnLogOUT() {
    this.lbolUserLogu = false;
    window.alert('*** Gracias por utilizar nuetros servicios financieros ***');
  }

  fnSignUP(){
    this.service.gbolSignUp = true;
  }
}
