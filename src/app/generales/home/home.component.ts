import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  lbolUserLogu: boolean = false;

  lblFecha = new Date();
  lblValor: number = 123456789;
  lblPorcen: number = 0.87654;
  lblTexto: string = 'Hoy es la clase del martes';

  public lSubscription: Subscription = new Subscription();

  constructor(private service: ServiceService) {}

  fnActiveObserver() {
    this.lSubscription = this.service.ResObserver$.subscribe((res: any) => {
      this.lSubscription.unsubscribe();
      console.log('fnActiveObserver --> ', res);
    });
  }

  fnTestObserver() {
    setTimeout(() => {
      console.log('fnTestObserver --> Fin del Time Out');
      this.service.fnSetResObserver(
        'Fin del Time Out. Simulación de acción del usuario o trigger'
      );
    }, 3000);
  }
}
