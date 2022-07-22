import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { USER } from '../../common/constants/api';
import { StorageService } from '../../common/services/storage.service';
import { StorageType } from '../../common/constants/storage-type';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class OnBoardingService {
    constructor(private http: HttpClient, private router: Router) {}

    signup(email, password, fullName, siteName) {
        this.http
            .post(USER.SIGNUP, {
                fullName,
                email,
                password,
                siteName,
                siteType: 1,
            })
            .toPromise()
            .then((response) => {
                const result = JSON.parse(JSON.stringify(response));
                if (result.status) {
                    const accessToken: string = result.data.token;
                    StorageService.set(StorageType.TOKEN, accessToken);
                }
                return result;
            });
    }
}
