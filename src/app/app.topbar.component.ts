import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { StorageService } from './common/services/storage.service';
import { StorageType } from './common/constants/storage-type';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items: MenuItem[];

    constructor(public appMain: AppMainComponent, private router: Router) {}

    logout() {
        console.log('hi');
        StorageService.remove(StorageType.TOKEN);
        this.router.navigateByUrl('/login');
    }
}
