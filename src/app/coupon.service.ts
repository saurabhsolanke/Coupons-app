import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private firestore: AngularFirestore) { }
  private collectionName = 'coupons';

  // Fetch coupons from Firestore
  getCoupons() {
    return this.firestore.collection(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addCoupon(coupon: any) {
    return this.firestore.collection('coupons').add(coupon);
  }

  updateCoupon(couponid: number, isSaved: boolean) {
    const couponId = couponid.toString();
    const couponRef = this.firestore.collection(this.collectionName).doc(couponId);
    console.log(`Attempting to update coupon with ID: ${couponId}`);
    return couponRef.update({ used: isSaved })
      .then(() => {
        console.log('Coupon updated successfully');
      })
      .catch(error => {
        console.error('Error updating coupon: ', error);
      });
  }

  // Delete a coupon from Firestore
  deleteCoupon(id: string) {
    return this.firestore.collection('coupons').doc(id).delete();
  }
}
