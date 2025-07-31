import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-couponcode',
  templateUrl: './couponcode.component.html',
  styleUrls: ['./couponcode.component.scss']
})
export class CouponcodeComponent implements OnInit {
  isConfettiVisible: boolean = false;
  confettiArray: number[] = Array(50).fill(0); // Create an array for multiple confetti pieces

  constructor() { }

  ngOnInit(): void {
  }
  
  couponclick() {
    // try {
    //   const coupon = this.coupons.find((c) => c.id === couponid);
    //   if (coupon && isSaved) {
    //     coupon.used = true;
    //   }
    //   await this.supabaseService.updateFlag(couponid, isSaved);
    //   console.log('Coupon updated successfully');
    //   this.playSound();
  
      // Show confetti
      this.isConfettiVisible = true;
  
      // Hide confetti after animation (e.g., 3 seconds)
      setTimeout(() => {
        this.isConfettiVisible = false;
      }, 3000);
  
    //   if (this.modalRef) {
    //     // Close modal if needed
    //   }
    // } catch (error) {
    //   console.error('Error updating coupon:', error);
    // }
  }
  
}
