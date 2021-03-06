import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {HandleAlertsProvider} from '../utilities/providers/handle-alerts-provider';
import {LoaderProvider} from '../utilities/providers/loader-provider';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    // private loaderValue: LoaderProvider,
    private handleAlertsProvider: HandleAlertsProvider
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth']);
      this.handleAlertsProvider.presentGenericAlert('Debe iniciar session antes de ingresar a el resto de la aplicacion...');
      // this.loaderValue.updateIsloading(false);
      return false;
    }
    return true;
  }

}
