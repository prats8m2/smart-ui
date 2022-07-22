import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './site.component.html',
    styleUrls: ['../../../assets/demo/badges.scss'],
    providers: [ConfirmationService],
})
export class SiteComponent implements OnInit {
    products: Product[];
    addSiteDialog: boolean = false;
    siteTypeOption: SelectItem[];
    siteTypeSelected: SelectItem;

    constructor(
        private productService: ProductService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));

        this.siteTypeOption = [
            {
                label: 'Restaurant',
                value: { id: 1, name: 'New York', code: 'NY' },
            },
            { label: 'Cafe', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            {
                label: 'Hostel',
                value: { id: 4, name: 'Istanbul', code: 'IST' },
            },
            {
                label: 'Cloud kitchen',
                value: { id: 5, name: 'Paris', code: 'PRS' },
            },
        ];
    }

    confirm1() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Are you sure to perform this action?',
        });
    }

    toggleAddSiteDialog() {
        this.addSiteDialog = !this.addSiteDialog;
    }
}
