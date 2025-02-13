import { Component, inject, OnInit } from '@angular/core';
import { CouponItemComponent } from '../coupon-item/coupon-item.component';
import { CouponFilterComponent } from '../coupon-filter/coupon-filter.component';
import { CouponsService } from '../../shared/coupons.service';
import { FormsModule } from '@angular/forms';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-display-coupons',
  standalone: true,
  templateUrl: './display-coupons.component.html',
  styleUrl: './display-coupons.component.css',
  imports: [
    CouponItemComponent,
    CouponFilterComponent,
    FormsModule,
    // MatPaginatorModule,
    PaginationComponent
  ]
})
export class DisplayCouponsComponent implements OnInit {

  coupons: any[] = [];
  filteredCoupons: any[] = [];
  paginatedCoupons: any[] = [];
  searchText: string = '';
  sortBy: 'newest' | 'oldest' = 'newest';
  pageNumber: number = 1;
  pageSize: number = 16;
  private couponsService = inject(CouponsService);
  
  ngOnInit() {
    this.getCoupons();
  }

  getCoupons() {
    this.couponsService.getCoupons().subscribe((res) => {
      this.coupons = res.data;
      this.filterAndSortCoupons();
    });
  }

  filterAndSortCoupons() {
    this.filteredCoupons = this.coupons
      .filter(coupon => 
        coupon.title.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return this.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });
      
      this.pageNumber = 1;
      this.updatePagination();
  }

  updatePagination() {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCoupons = this.filteredCoupons.slice(start, end);
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.updatePagination();
  }
  
}