import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ServiceService } from '../../services/service.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private service: ServiceService
  ) {}

  accounts: any[] = [];
  txtUser: string = '';
  txtNumeCuen: string = '';
  //txtCodigoUsuario: string = '';
  txtNombreCuenta: string = '';
  txtNumeroCuenta: string = '';
  lblMensajeAccount: string = '';

  public Subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.txtUser = this.service.txtUser;
    this.fnGetAccountsComponent();
  }

  fnGetAccountsComponent() {
    this.txtNombreCuenta = '';
    this.txtNumeroCuenta = '';
    this.service.txtUser = this.txtUser;
    this.dataService.fnGetAccountsDataServices(this.txtUser).subscribe({
      next: (res) => {
        this.accounts = res;
      },
    });
  }

  fnSaveAccountComponent() {
    this.lblMensajeAccount = '';
    if (!this.fnValidaCampos()) {
      alert('*** Debes ingresar los campos obligatorios *** ')
    } else {
      //Ventana de confirmación
      let resul = confirm('¿Está seguro de almacenar el registro?');
      if (resul == true) {
        this.service.fnSetResObserver('SI');
      } else {
        this.service.fnSetResObserver('NO');
      }
      //Realizo la subscripción
      this.Subscription = this.service.ResObserver$.subscribe((res: any) => {
        if (res == 'SI') {
          this.fnObsSaveAccount();
        }
        this.Subscription.unsubscribe(); // Cancelo la subscripción
      });
    }
  }

  fnObsSaveAccount() {
    this.dataService
      .fnSaveAccountDataServices(
        this.service.txtUser,
        this.txtNombreCuenta,
        this.txtNumeroCuenta
      )
      .subscribe({
        next: (res) => {
          if (res[0].Status == 'OK') {
            alert('¡¡¡¡ Registro Almacenado Exitosamente !!!')
            this.fnGetAccountsComponent();
          } else {
            alert(res[0].Error);
          }
        },
      });
  }

  fnValidaCampos() {
    if (this.txtNumeroCuenta == '' || this.txtNombreCuenta == '') {
      return false;
    } else {
      return true;
    }
  }
}
