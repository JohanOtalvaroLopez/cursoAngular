import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ServiceService } from '../../services/service.service';
import { Subscribable, Subscription } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;
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
  ngAfterViewInit() {}
  fnSaveTranComponent() {
    if (!this.fnValidaCampos()) {
      alert('*** Debes ingresar los campos obligatorios *** ');
    } else {
      this.Subscription = this.service.ResObserver$.subscribe((res: any) => {
        this.Subscription.unsubscribe(); // Cancelo la subscripción
        if (res == 'SI') {
          console.log('res == SI');
          this.fnObsSaveTran();
        }
      });
      //Ventana de confirmación
      let result = confirm('¿Está seguro de almacenar el registro?');
      if (result == true) {
        this.service.fnSetResObserver('SI');
      } else {
        this.service.fnSetResObserver('NO');
      }
    }
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
          this.fnLimpiarCampos();
          this.tabGroup.selectedIndex = 1;
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
