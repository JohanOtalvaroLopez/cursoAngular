import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  txtCodiUser: string = '';
  txtNombUser: string = '';
  txtPassUser: string = '';
  lblMensajeProfile: string = '';

  ngOnInit(): void {
    const evKeyUp = fromEvent(document, 'keyup');
    const result = evKeyUp.pipe(debounceTime(500));
    result.subscribe({
      next: (x) => {
        var target = x.target as HTMLInputElement;
        if (target.name == 'txtCodiUser') {
          console.log('Pasé por acá --> ', this.txtCodiUser);
          this.fnValiProfileComponent();
        }
      },
    });
    console.log('OnInit :' + new Date());
  }

  ngOnDestroy(): void {
    console.log('OnDestroy :' + new Date());
  }

  fnValiProfileComponent() {
    this.txtNombUser = '';
    this.txtPassUser = '';
    this.dataService.fnValiProfileDataServices(this.txtCodiUser).subscribe({
      next: (res) => {
        if (res[0].NombUsua == '') {
          this.lblMensajeProfile = 'Usuario no encontrado';
        } else {
          this.lblMensajeProfile = '';
          this.txtNombUser = res[0].NombUsua;
          this.txtPassUser = res[0].PassUser;
        }
      },
    });
  }
}
