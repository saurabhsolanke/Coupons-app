import { Injectable } from '@angular/core';
import { Coupons } from './coupons';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  private coupons: Coupons[] = [
    {
      id: "1",
      name: "Summer Sale",
      number: "SUMMER2024",
      used: false,
      description: "Get 20% off on all summer collection items"
    },
    {
      id: "2",
      name: "New Customer",
      number: "WELCOME10",
      used: true,
      description: "10% discount for first-time customers"
    },
    {
      id: "3",
      name: "Holiday Special",
      number: "HOLIDAY25",
      used: false,
      description: "25% off on holiday season products"
    },
    {
      id: "4",
      name: "Flash Sale",
      number: "FLASH50",
      used: false,
      description: "50% off on selected items for limited time"
    },
    {
      id: "5",
      name: "Loyalty Reward",
      number: "LOYAL15",
      used: true,
      description: "15% discount for loyal customers"
    }
  ];

  constructor() { }

  async getCoupons(): Promise<Coupons[]> {
    return Promise.resolve(this.coupons);
  }

  async updateCouponFlag(couponId: string, isUsed: boolean): Promise<void> {
    const coupon = this.coupons.find(c => c.id === couponId);
    if (coupon) {
      coupon.used = isUsed;
    }
    return Promise.resolve();
  }
} 