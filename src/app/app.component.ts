import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { DisplayCouponsComponent } from './coupons/display-coupons/display-coupons.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    DisplayCouponsComponent,
    ContactUsComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
