import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private appComponent: AppComponent
  ) {}

  accounts: any[] = [];
  lstrUser: string ='';

  ngOnInit(): void {
    this.fnGetAccounts();
  }

  fnGetAccounts() {
    this.dataService.fnGetAccounts(this.lstrUser).subscribe({
      next: (res) => {
        this.accounts = res;
      },
    });
  }
}
