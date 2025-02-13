import { Component, input } from '@angular/core';
import { TruncatePipe } from '../../shared/truncate.pipe';

@Component({
  selector: 'app-coupon-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './coupon-item.component.html',
  styleUrl: './coupon-item.component.css',
  host: {
    class: 'card'
  }
})
export class CouponItemComponent {
  coupon = input.required<any>();
}
