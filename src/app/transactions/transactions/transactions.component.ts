import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  constructor(private dataService: DataService) {}

  transacs: any[] = [];
  txtType: string = '';
  txtNumeCuen: string = '';
  txtAmount: string = '';
  txtCategoria: string = '';
  txtDescripcion: string = '';
  txtEstado: string = '';

  fnSaveTranComponent() {
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
          console.log('fnSaveTranComponent --> ', res);
          this.transacs = res;
        },
      });
    this.fnLimpiarCampos();
  }

  fnLimpiarCampos() {
    this.txtType = '';
    this.txtNumeCuen = '';
    this.txtAmount = '';
    this.txtCategoria = '';
    this.txtDescripcion = '';
    this.txtEstado = '';
  }
}
