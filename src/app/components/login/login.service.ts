import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { USER } from '../../common/constants/api';
import { StorageService } from '../../common/services/storage.service';
import { StorageType } from '../../common/constants/storage-type';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) {}

    login(email, password) {
        this.http
            .post(USER.LOGIN, {
                email,
                password,
            })
            .toPromise()
            .then((response) => {
                const result = JSON.parse(JSON.stringify(response));
                if (result.status) {
                    const accessToken: string = result.data.token;
                    StorageService.set(StorageType.TOKEN, accessToken);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Service Message',
                        detail: 'Via MessageService',
                    });
                    this.router.navigateByUrl('/dashboard');
                } else {
                    console.log('Wrong creds');
                }
                return result;
            });
    }
}
