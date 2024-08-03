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

  ngOnInit(): void {
    this.txtUser = this.service.txtUser; 
    this.fnGetAccountsComponent();
  }

  fnGetAccountsComponent() {
    this.dataService.fnGetAccountsDataServices(this.txtUser).subscribe({ // --> Solo busca con el INPUT pero no con el del LOGIN(Robin)
      next: (res) => {
        this.accounts = res;
      },
    });
  }
}
