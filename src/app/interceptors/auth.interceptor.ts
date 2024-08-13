import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('authInterceptor');
  //console.log(req);
  var newreq = req.clone({ setHeaders: { Authorization: 'My Token' } });
  //console.log(newreq);
  return next(newreq);
};
