import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'https://erpapipruebas.azurewebsites.net/api/values';

  fnValiUser(CodiUser: string, PassUser: string): Observable<any> {
    let UserInfo: any[] = [];
    UserInfo.push({ CodiUser: CodiUser, PassUser: PassUser });

    return this.http
      .post(this.apiUrl + '/ValiUser', UserInfo, httpOptions)
      .pipe(
        tap((res: any) => {
          console.log('dataservices_fnValiUser:', res);
          return res;
        })
      );
  }

  fnGetAccountsDataServices(CodiUser: string): Observable<any> {
    let User: any[] = [];
    User.push({ CodiUser: CodiUser });
    return this.http.post(this.apiUrl + '/GetAccounts', User, httpOptions).pipe(
      tap((res: any) => {
        console.log('dataservices_fnGetAccounts:', res);
        return res;
      })
    );
  }

  fnSignUPDataServices(
    CodiUser: string,
    NombUser: string,
    PassUser: string
  ): Observable<any> {
    let User: any[] = [];
    User.push({ CodiUser: CodiUser, NombUser: NombUser, PassUser: PassUser });
    return this.http.post(this.apiUrl + '/signup', User, httpOptions).pipe(
      tap((res: any) => {
        console.log('dataservices_fnSignUPDataServices:', res);
        return res;
      })
    );
  }

  fnValiProfileDataServices(CodiUser: string): Observable<any> {
    let UserInfo: any[] = [];
    UserInfo.push({ CodiUser: CodiUser });
    return this.http
      .post(this.apiUrl + '/Valiprof', UserInfo, httpOptions)
      .pipe(
        tap((res: any) => {
          console.log('dataservices_fnValiProfileDataServices:', res);
          return res;
        })
      );
  }

  fnSaveAccountDataServices(
    CodiUser: string,
    NombCuen: string,
    NumeCuen: string
  ): Observable<any> {
    let UserInfo: any[] = [];
    UserInfo.push({
      CodiUser: CodiUser,
      NombCuen: NombCuen,
      NumeCuen: NumeCuen,
    });
    return this.http
      .post(this.apiUrl + '/SaveAccount', UserInfo, httpOptions)
      .pipe(
        tap((res: any) => {
          console.log('dataservices_fnSaveAccountDataServices:', res);
          return res;
        })
      );
  }

  fnSaveTranDataServices(
    Type: string,
    NumeCuen: string,
    Amount: string,
    Categoria: string,
    Descripcion: string,
    Estado: string
  ): Observable<any> {
    let TransactionInfo: any[] = [];
    TransactionInfo.push({
      Type: Type,
      NumeCuen: NumeCuen,
      Amount: Amount,
      Categoria: Categoria,
      Descripcion: Descripcion,
      Estado: Estado,
    });
    return this.http
      .post(this.apiUrl + '/SaveTran', TransactionInfo, httpOptions)
      .pipe(
        tap((res: any) => {
          console.log('dataservices_fnSaveTranDataServices:', res);
          return res;
        })
      );
  }
}
