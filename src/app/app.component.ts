import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { ServiceService } from './services/service.service';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '$$$ My App Bank $$$';
  lbolUserLogu: boolean = false;
  lstrUser: string = 'Robin';
  lstrPass: string = '1234';
  lstrMessag: string = '';

  constructor(
    private apiService: DataService,
    public service: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lbolUserLogu = false;
  }

  ngDoCheck(): void {
    //console.log('DoCheck');
  }

  fnLogIN() {
    this.apiService.fnValiUser(this.lstrUser, this.lstrPass).subscribe({
      next: (res) => {
        //console.log('Next');
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
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        //console.log('Completed');
      },
    });
  }

  fnLogOUT() {
    this.lbolUserLogu = false;
    alert('*** Gracias por utilizar nuetros servicios financieros ***');
  }

  fnSignUP() {
    this.service.gbolSignUp = true;
  }
}
