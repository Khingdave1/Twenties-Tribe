import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCouponsComponent } from './display-coupons.component';
import { provideHttpClient } from '@angular/common/http';
import { CouponsService } from '../../shared/coupons.service';

describe('DisplayCouponsComponent', () => {
  let component: DisplayCouponsComponent;
  let fixture: ComponentFixture<DisplayCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCouponsComponent],
      providers: [
        provideHttpClient(),
        CouponsService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
