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
  lstrUser: string = '';

  ngOnInit(): void {
    this.fnGetAccounts();
  }

  fnGetAccounts() {
    this.dataService.fnGetAccounts(this.lstrUser).subscribe({ // --> Se va siempre con ROBIN(LOGIN)
    //this.dataService.fnGetAccounts(this.service.lstrUser).subscribe({ // --> Solo busca con el INPUT pero no con el del LOGIN(Robin)
      next: (res) => {
        this.accounts = res;
      },
    });
  }
}
