import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { NavesService } from './naves.service';
import { HttpResponse } from '@angular/common/http';
import { Naves } from '../interfaces/naves';

@Injectable({
    providedIn: 'root'
})
export class NaveResolver implements Resolve<any> {

    constructor(private navesService: NavesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const url = decodeURIComponent(route.paramMap.get('nave.url')!);

        return this.navesService.getNaveDato(url!).pipe(
            map((response: HttpResponse<Naves>) => response.body as Naves)
        )
    }
}