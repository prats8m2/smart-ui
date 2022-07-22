import { Injectable } from '@angular/core';
import { IAPIResponse } from '../interfaces/api-response';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormControl } from '@angular/forms';
import { IDecodeToken } from '../interfaces/decode-token';
import { StorageService } from './storage.service';
import { StorageType } from '../constants/storage-type';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    accessToken!: string | null;
    decodeToken!: IDecodeToken;
    userRole!: string;
    reportUrl!: string;
    constructor(
        private messageService: MessageService,
        private router: Router
    ) {}
    handleSuccessService(result: IAPIResponse, showToast = true) {
        if (result.code == 200) {
            if (showToast)
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
            return true;
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: result.message,
            });
            return false;
        }
    }

    checkEmptyValue(valueReceived: string | number | undefined) {
        if (valueReceived === null || valueReceived === '') {
            return 'NA';
        }
        return valueReceived;
    }

    chipNameProvider(fullName: string | undefined | null) {
        const splitNameArray: string[] | undefined = fullName
            ?.trim()
            ?.split(' ');
        let chipName = '';
        if (splitNameArray) {
            if (splitNameArray.length > 1 && splitNameArray[1] !== 'null') {
                chipName =
                    splitNameArray[0].charAt(0) +
                    splitNameArray[splitNameArray.length - 1].charAt(0);
            } else {
                chipName =
                    splitNameArray[0].charAt(0) +
                    splitNameArray[0].charAt(splitNameArray[0].length - 1);
            }
        }
        return chipName.toUpperCase();
    }

    toControl(absCtrl: AbstractControl): FormControl {
        const ctrl = absCtrl as FormControl;
        return ctrl;
    }

    checkMobileField(mobileNumber: string, countryCode: string) {
        if (
            mobileNumber !== null &&
            mobileNumber !== '' &&
            mobileNumber !== undefined
        ) {
            return countryCode + mobileNumber;
        } else {
            return null;
        }
    }

    setMobileField(value: string, mobileNumber: string) {
        console.log(value);
        console.log(mobileNumber);
        let numberValue!: string;
        let countryCode!: string;
        if (mobileNumber !== undefined && mobileNumber !== null) {
            const length = mobileNumber.length;
            const splitIndex = length - 10;
            (countryCode = mobileNumber.slice(0, splitIndex)),
                (numberValue = mobileNumber.slice(splitIndex, length));
            console.log(numberValue, countryCode);
        } else {
            numberValue = '';
            countryCode = '+91';
        }
        switch (value) {
            case 'code':
                return countryCode;
            case 'number':
                return numberValue;
            default:
                return '';
        }
    }
    getDecodeToken() {
        const accessToken = StorageService.get(StorageType.TOKEN);
        if (accessToken) return JSON.parse(atob(accessToken.split('.')[1]));
        else this.router.navigateByUrl('');
    }

    getUserRole(value: string) {
        const accessToken = StorageService.get(StorageType.TOKEN);
        let decodeToken;
        if (accessToken) {
            decodeToken = JSON.parse(atob(accessToken.split('.')[1]));
        } else {
            this.router.navigateByUrl('');
        }
        let userRole = decodeToken.role[0].name.toLowerCase();
        if (userRole !== 'super admin' && userRole !== 'client admin') {
            userRole = 'user';
        }
        switch (value) {
            case 'decodeToken':
                return decodeToken;
            case 'userRole':
                return userRole;
        }
    }
}
