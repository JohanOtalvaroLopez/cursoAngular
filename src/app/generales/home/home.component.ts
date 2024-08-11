import { Component } from '@angular/core';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

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
}
