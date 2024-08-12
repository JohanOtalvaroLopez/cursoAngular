import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  CodiUser: string = '';
  NombUser: string = '';
  PassUser: string = '';
  lblMensajeSignUp: string = '';

  constructor(
    public service: ServiceService,
    private dataService: DataService
  ) {}

  fnCancel() {
    this.service.gbolSignUp = false;
  }

  fnSignUP() {
    let res = this.dataService
      .fnSignUPDataServices(this.CodiUser, this.NombUser, this.PassUser)
      .subscribe({
        next: (res) => {
          if (res[0].Status == 'OK') {
            alert('¡Registro alamacenado exitosamente!');
            //this.lblMensajeSignUp = '¡Registro alamacenado exitosamente!';
          } else {
            alert('Error --> ' + res[0].Error);
            //this.lblMensajeSignUp = 'Error --> ' + res[0].Error;
          }
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }
}
