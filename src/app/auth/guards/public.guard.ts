import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
   ) { }

  private chechAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated) ),
      tap( isAuthenticated => {
        if( isAuthenticated ) {
          this.router.navigate(['./'])
        }
      } ),
      map( isAuthenticated => !isAuthenticated )
    )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log({route, segments})
    // return false
    return this.chechAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    // console.log({route, state})
    // return  false;
    return this.chechAuthStatus();
  }

}