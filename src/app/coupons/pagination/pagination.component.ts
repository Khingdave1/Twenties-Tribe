import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() pageNumber!: number;
  @Input() pageSize!: number;
  @Input() totalItems!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  get startItem(): number {
    return (this.pageNumber - 1) * this.pageSize + 1;
  }
  
  get endItem(): number {
    return Math.min(this.pageNumber * this.pageSize, this.totalItems);
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): (number | string)[] {
    this.getTotalPages();
    const pages: (number | string)[] = [];
    let start = Math.max(2, this.pageNumber - 2); // Start from at least page 2
    let end = Math.min(this.totalPages - 1, this.pageNumber + 2); // End at last page - 1
  
    // Ensure enough pages are shown at the start
    if (this.pageNumber < 4) {
      end = Math.min(6, this.totalPages - 1);
    }
  
    // Ensure enough pages are shown at the end
    if (this.pageNumber > this.totalPages - 3) {
      start = Math.max(this.totalPages - 5, 2);
    }
  
    // Always show the first page
    pages.push(1);
  
    // Left Ellipsis
    if (start > 2) {
      pages.push("...");
    }
  
    // Middle pages (dynamically calculated)
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    // Right Ellipsis
    if (end < this.totalPages - 1) {
      pages.push("...");
    }
  
    // Always show the last page (only if > 1)
    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  changePage(newPage: number | string): void {
    if (typeof newPage === 'number') {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.pageNumber = newPage;
        this.pageChange.emit(this.pageNumber);
      }
    }
  }
}
