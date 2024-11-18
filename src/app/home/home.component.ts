import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../coupon.service';
import { Coupons } from '../coupons';
import { LocaldbService } from '../localdb.service';
import { SupabaseService } from '../supabase.service';
import confetti from "canvas-confetti";
import * as AOS from 'aos';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state
      transition(':enter', [animate('1s ease-in')]), // Fade-in on enter
      transition(':leave', [animate('0.5s ease-out')]) // Fade-out on leave
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  closeResult!: string;
  coupons: any[] = [];
  Coupons: any[] = [];
  used!: boolean;
  items: any[] = [];
  private modalRef: NgbModalRef | null = null;
  showUsedTemplate: boolean = false;

  constructor(
    public modalService: NgbModal,
    private localdb: LocaldbService,
    private couponService: CouponService,
    private supabaseService: SupabaseService, private renderer: Renderer2, private el: ElementRef
  ) { }
  ngOnInit() {
    AOS.init();
    this.fetchPosts();
  }

  private confettiInterval: any;

  ngAfterViewInit(): void {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (canvas) {
      const myConfetti = confetti.create(canvas, { resize: true });

      // Run confetti continuously
      this.confettiInterval = setInterval(() => {
        myConfetti({
          particleCount: 50,
          spread: 70,
          origin: { x: Math.random(), y: Math.random() - 0.2 }, // Random origin
        });
      }, 1000); // Fire confetti every second
    }
  }


  ngOnDestroy(): void {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval); // Stop confetti on component destroy
    }
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
      const coupon = this.coupons.find((c) => c.id === couponid);
      if (coupon && isSaved) {
        coupon.used = true;
      }
      await this.supabaseService.updateFlag(couponid, isSaved);
      console.log('Coupon updated successfully');
      // setTimeout(() => {
        // this.showUsedTemplate = true;
      // }, 1);
      if (this.modalRef) {
        // this.modalRef.close();
        // this.fetchPosts();
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  }

  // Open modal and store the reference
  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'lg' 
    },);
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
