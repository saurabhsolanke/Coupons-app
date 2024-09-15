import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../coupon.service';
import { Coupons } from '../coupons';
import { LocaldbService } from '../localdb.service';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  closeResult!: string;
  coupons: any[] = [];
  Coupons: any[] = [];
  used!: boolean;
  items: any[] = [];
  private modalRef: NgbModalRef | null = null;

  constructor(
    public modalService: NgbModal,
    private localdb: LocaldbService,
    private couponService: CouponService,
    private supabaseService: SupabaseService,
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  // Fetch coupons
  async fetchPosts() {
    try {
      this.coupons = (await this.supabaseService.getPosts()) || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // Coupon click: update the flag
  async couponclick(couponid: number, isSaved: boolean) {
    try {
      await this.supabaseService.updateFlag(couponid, isSaved);
      console.log('Coupon updated successfully');

      // Close the modal if the update was successful
      if (this.modalRef) {
        this.modalRef.close();
        this.fetchPosts();
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  }

  // Open modal and store the reference
  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modalRef.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
