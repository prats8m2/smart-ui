import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { StorageType } from '../constants/storage-type';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (StorageService.get(StorageType.TOKEN)) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
