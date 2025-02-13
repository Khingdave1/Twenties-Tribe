import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

type FormOptions = {
  value: string | number | boolean;
  label: string;
}

@Component({
  selector: 'app-coupon-filter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    MatSliderModule,
  ],
  templateUrl: './coupon-filter.component.html',
  styleUrl: './coupon-filter.component.css',
  host: {
    class: 'coupon-filters'
  }
})
export class CouponFilterComponent implements OnInit {
  formGroup!: FormGroup;

  categories: FormOptions[] = [
    { label: 'Restuarant', value: 1 },
    { label: 'Music', value: 2 },
    { label: 'Shopping', value: 3 },
    { label: 'Ride', value: 4 },
    { label: 'E-Commerce', value: 5 }
  ];

  percentages: FormOptions[] = [
    { label: 'Free', value: 0 },
    { label: '10 - 20%', value: 1 },
    { label: '35 - 50%', value: 2 },
    { label: '50 - 65%', value: 3 },
    { label: '65% & Above', value: 4 }
  ];

  locations: FormOptions[] = [
    { label: 'Lagos', value: 'lagos' },
    { label: 'Ogun', value: 'ogun' },
    { label: 'Oyo', value: 'oyo' },
    { label: 'Abuja', value: 'Abuja' },
    { label: 'Port Harcourt', value: 'Port Harcourt' }
  ];

  minLimit: number = 500;
  maxLimit: number = 1000000;

  fb = inject(FormBuilder);
  
  ngOnInit(): void {
    this.initForm();
    this.listenToChanges();
  }

  initForm() {
    this.formGroup =  this.fb.group({
      category: [''],
      minValue: [1000],
      maxValue: [500000],
      percentage: [1],
      location: ['lagos'],
    });
  }

  getFilterValues() {
    console.log(this.formGroup.value);  
  }

  listenToChanges() {
    this.formGroup.get('minValue')?.valueChanges.subscribe((value) => {
      if (value < this.minLimit) {
        this.formGroup.patchValue({ minValue: this.minLimit }, { emitEvent: false });
      }
      if (value > this.formGroup.get('maxValue')?.value) {
        this.formGroup.patchValue({ minValue: this.formGroup.get('maxValue')?.value }, { emitEvent: false });
      }
    });

    this.formGroup.get('maxValue')?.valueChanges.subscribe((value) => {
      if (value > this.maxLimit) {
        this.formGroup.patchValue({ maxValue: this.maxLimit }, { emitEvent: false });
      }
      if (value < this.formGroup.get('minValue')?.value) {
        this.formGroup.patchValue({ maxValue: this.formGroup.get('minValue')?.value }, { emitEvent: false });
      }
    });
  }

  onSliderChange() {
    this.formGroup.patchValue({
      minValue: this.formGroup.get('minValue')?.value,
      maxValue: this.formGroup.get('maxValue')?.value,
    });
  }

  onMinInputChange() {
    let minValue = this.formGroup.get('minValue')?.value;
    let maxValue = this.formGroup.get('maxValue')?.value;

    if (minValue < this.minLimit) {
      minValue = this.minLimit;
    }
    if (minValue > maxValue) {
      minValue = maxValue;
    }

    this.formGroup.patchValue({ minValue }, { emitEvent: false });
  }

  onMaxInputChange() {
    let minValue = this.formGroup.get('minValue')?.value;
    let maxValue = this.formGroup.get('maxValue')?.value;

    if (maxValue > this.maxLimit) {
      maxValue = this.maxLimit;
    }
    if (maxValue < minValue) {
      maxValue = minValue;
    }

    this.formGroup.patchValue({ maxValue }, { emitEvent: false });
  }

  formatLabel(value: number): string {
    return value.toLocaleString();
  }

}
