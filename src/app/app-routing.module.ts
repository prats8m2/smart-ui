import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmptyComponent } from './components/empty/empty.component';
import { AppMainComponent } from './app.main.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SiteComponent } from './components/site/site.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductComponent } from './components/product/product.component';
import { QRCodeComponent } from './components/qrcode/qrcode.component';
import { ThemeComponent } from './components/themes/theme.component';
import { AuthGuard } from './common/guard/auth.guard';
import { SignComponent } from './components/signup/signup.component';
import { OnBoardingComponent } from './components/onBoarding/onBoarding.component';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppMainComponent,
                    children: [
                        { path: 'dashboard', component: DashboardComponent },
                        { path: 'pages/empty', component: EmptyComponent },
                        {
                            path: 'sites',
                            component: SiteComponent,
                        },
                        {
                            path: 'menus',
                            component: MenuComponent,
                        },
                        {
                            path: 'products',
                            component: ProductComponent,
                        },
                        {
                            path: 'qrcode',
                            component: QRCodeComponent,
                        },
                        {
                            path: 'themes',
                            component: ThemeComponent,
                        },
                    ],
                    canActivate: [AuthGuard],
                },
                {
                    path: '',
                    component: AppMainComponent,
                    children: [
                        { path: 'onboarding', component: OnBoardingComponent },
                    ],
                },
                { path: 'pages/landing', component: LandingComponent },
                { path: 'login', component: LoginComponent },
                { path: 'signup', component: SignComponent },
                { path: 'pages/error', component: ErrorComponent },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
