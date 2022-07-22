import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit, OnDestroy {
    valCheck: string[] = ['remember'];

    password: string = 'Pass@1234';

    email: string = 'prateek3693@gmail.com';

    config: AppConfig;

    subscription: Subscription;

    constructor(
        public configService: ConfigService,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
            }
        );
    }

    login() {
        this.loginService.login(this.email, this.password);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
