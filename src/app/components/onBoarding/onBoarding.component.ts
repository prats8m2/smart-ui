import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../common/services/global.service';
import { StorageService } from '../../common/services/storage.service';
import { StorageType } from 'src/app/common/constants/storage-type';
import { USER } from 'src/app/common/constants/api';
import { OnBoardingService } from './onBoarding.service';

@Component({
    templateUrl: './onBoarding.component.html',
    styleUrls: ['./onboard.scss'],
})
export class OnBoardingComponent implements OnInit {
    onBoardDialog = true;
    qrCodeDialog = false;
    items: MenuItem[];

    products: Product[];

    chartData: any;

    chartOptions: any;

    subscription: Subscription;

    config: AppConfig;

    fullName: string;

    email: string;

    password: string;

    siteName: string;

    runOne: [{ run: 1 }];

    constructor(
        private productService: ProductService,
        public configService: ConfigService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private globalService: GlobalService,
        private onboardService: OnBoardingService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            console.log(params); // { orderby: "price" }
            this.fullName = params.name;
            this.siteName = params.siteName;
        });

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
                this.updateChartOptions();
            }
        );
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860',
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: '#00bb7e',
                    borderColor: '#00bb7e',
                    tension: 0.4,
                },
            ],
        };
    }

    gotoDownloadQRCode() {
        this.onBoardDialog = false;
        this.qrCodeDialog = true;
        this.onboardService.signup(
            this.email,
            this.password,
            this.fullName,
            this.siteName
        );
    }

    updateChartOptions() {
        if (this.config.dark) this.applyDarkTheme();
        else this.applyLightTheme();
    }

    applyDarkTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
                y: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
            },
        };
    }

    applyLightTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };
    }
}
