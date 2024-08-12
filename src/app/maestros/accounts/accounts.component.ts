import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ServiceService } from '../../services/service.service';

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
  lblMensajeAccount: string = '';

  //txtCodigoUsuario: string = '';
  txtNombreCuenta: string = '';
  txtNumeroCuenta: string = '';

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
      this.lblMensajeAccount =
        '*** Debes ingresar los campos obligatorios *** ';
    } else {
      this.dataService
        .fnSaveAccountDataServices(
          this.service.txtUser,
          this.txtNombreCuenta,
          this.txtNumeroCuenta
        )
        .subscribe({
          next: (res) => {
            if (res[0].Status == 'OK') {
              this.lblMensajeAccount =
                '¡¡¡¡ Registro Almacenado Exitosamente !!!';
              this.fnGetAccountsComponent();
            } else {
              this.lblMensajeAccount = res[0].Error;
            }
          },
        });
    }
  }

  fnValidaCampos() {
    if (this.txtNumeroCuenta == '' || this.txtNombreCuenta == '') {
      return false;
    } else {
      return true;
    }
  }
}
