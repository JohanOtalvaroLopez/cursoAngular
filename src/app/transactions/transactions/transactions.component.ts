import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ServiceService } from '../../services/service.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  constructor(
    private dataService: DataService,
    private service: ServiceService
  ) {}

  transacs: any[] = [];
  txtType: string = '';
  txtNumeCuen: string = '10203065';
  txtAmount: string = '2000';
  txtCategoria: string = 'Educación';
  txtDescripcion: string = 'Icetex';
  txtEstado: string = '';
  result: boolean = false;
  cont: number = 0;

  public Subscription: Subscription = new Subscription();

  ngOnInit() {}
  fnSaveTranComponent() {
    this.cont = this.cont + 1;
    console.log('Contador: ', this.cont);
    if (!this.fnValidaCampos()) {
      alert('*** Debes ingresar los campos obligatorios *** ');
    } else {
      //Ventana de confirmación
      let result = confirm('¿Está seguro de almacenar el registro?');
      if (result == true) {
        this.service.fnSetResObserver('SI');
        console.log('fnSetResObserver SI');
      } else {
        this.service.fnSetResObserver('NO');
        console.log('fnSetResObserver NO');
      }
    }
    //Realizo la subscripción
    this.Subscription = this.service.ResObserver$.subscribe((res: any) => {
      this.Subscription.unsubscribe(); // Cancelo la subscripción
      //console.log('pasé por el final...');
      console.log('pasé por la subscripción...');
      if (res == 'SI') {
        console.log('res == SI');
        this.fnObsSaveTran();
      }
    });
  }

  fnObsSaveTran() {
    this.dataService
      .fnSaveTranDataServices(
        this.txtType,
        this.txtNumeCuen,
        this.txtAmount,
        this.txtCategoria,
        this.txtDescripcion,
        this.txtEstado
      )
      .subscribe({
        next: (res) => {
          var lRow = res[0];
          for (var i in lRow) {
            if (i == 'Error') {
              alert('Error\n' + res[0].Error);
              return;
            }
          }
          alert('¡¡¡¡ Registro Almacenado Exitosamente !!!');
          this.transacs = this.fnCalcularBalance(res);
          //console.log('fnSaveTranComponent --> ', res);
          this.fnLimpiarCampos();
        },
      });
  }

  fnCalcularBalance(transactions: any[]): any[] {
    let saldo: number = 0;
    for (var i = transactions.length - 1; i >= 0; i--) {
      if (transactions[i].Type == 'Retiro') {
        saldo -= transactions[i].Amount;
      } else {
        saldo += transactions[i].Amount;
      }
      transactions[i].Balance = saldo;
    }
    return transactions;
  }

  fnLimpiarCampos() {
    this.txtType = '';
    this.txtNumeCuen = '';
    this.txtAmount = '';
    this.txtCategoria = '';
    this.txtDescripcion = '';
    this.txtEstado = '';
  }
  fnValidaCampos() {
    if (
      this.txtType == '' ||
      this.txtNumeCuen == '' ||
      this.txtAmount == '' ||
      this.txtCategoria == '' ||
      this.txtDescripcion == '' ||
      this.txtEstado == ''
    ) {
      console.log('resp método: false');
      return false;
    } else {
      console.log('resp método: true');
      return true;
    }
  }
}
