import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPrimeNGModule } from './app-primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AppPrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule,
    ],
    exports: [
        AppPrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule,
    ],
})
export class AppSharedModule {}
