import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AfterViewInit, HostListener } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  closeResult!: string;
  constructor(public modalService: NgbModal, private couponService: CouponService) { }

  coupons: any[] = [];
  used!: boolean;

  ngOnInit() {
    this.couponService.getCoupons().subscribe(data => {
      this.coupons = data;
      console.log(this.coupons);
    });
  }

  couponclick(couponid: number, isSaved: boolean) {
    this.couponService.updateCoupon(couponid, isSaved)
      .then(() => {
        console.log('Coupon updated successfully');
      })
      .catch(error => {
        console.error('Error updating coupon: ', error);
      });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
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

  // //GPT 

  // ngAfterViewInit() {
  //   this.coupons.forEach((coupon) => {
  //     this.setupScratchCard(coupon.id);
  //   });
  // }

  // setupScratchCard(couponId: string) {
  //   const canvas = document.querySelector(`#${couponId} .scratch-canvas`) as HTMLCanvasElement | null;
  
  //   if (!canvas) {
  //     console.error(`Canvas not found for couponId: ${couponId}`);
  //     return;
  //   }
  
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) {
  //     console.error('Failed to get 2D context for canvas');
  //     return;
  //   }
  
  //   // Draw the initial overlay
  //   ctx.fillStyle = 'silver';
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //   let isDrawing = false;
  
  //   // Add mouse event listeners
  //   canvas.addEventListener('mousedown', () => {
  //     isDrawing = true;
  //   });
  
  //   canvas.addEventListener('mouseup', () => {
  //     isDrawing = false;
  //   });
  
  //   canvas.addEventListener('mousemove', (event) => {
  //     if (isDrawing) {
  //       this.scratch(event, canvas, ctx, couponId);
  //     }
  //   });
  
  //   canvas.addEventListener('mouseleave', () => {
  //     isDrawing = false;
  //   });
  // }
  
  

  // scratch(event: MouseEvent, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, couponId: string) {
  //   const rect = canvas.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   const radius = 20; // Scratch radius
  
  //   ctx.globalCompositeOperation = 'destination-out'; // Makes the drawn area transparent
  //   ctx.beginPath();
  //   ctx.arc(x, y, radius, 0, 2 * Math.PI);
  //   ctx.fill();
  
  //   this.checkScratchCompletion(ctx, canvas, couponId);
  // }

  // checkScratchCompletion(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, couponId: string) {
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   const totalPixels = imageData.data.length / 4;
  //   let transparentPixels = 0;
  
  //   for (let i = 3; i < imageData.data.length; i += 4) {
  //     if (imageData.data[i] === 0) { // Check for fully transparent pixels
  //       transparentPixels++;
  //     }
  //   }
  
  //   if (transparentPixels / totalPixels > 0.5) {
  //     this.revealCoupon(couponId);
  //   }
  // }
  
  

  // revealCoupon(couponId: string) {
  //   const coupon = this.coupons.find((c) => c.id === couponId);
  //   if (coupon) {
  //     coupon.revealed = true;

  //     // Optionally remove the canvas once revealed
  //     const canvas = document.querySelector(`#${couponId} .scratch-canvas`);
  //     if (canvas) {
  //       canvas.remove();
  //     }
  //   }
  // }


  // Code pen ********************************************************

  // private canvas!: HTMLCanvasElement;
  // private context!: CanvasRenderingContext2D;
  // private mouseX = 0;
  // private mouseY = 0;
  // private isDragged = false;
  // private deviceType: 'mouse' | 'touch' = 'mouse';
  // private clickCount = 0;

  // ngAfterViewInit() {
  //   this.canvas = document.getElementById('scratch') as HTMLCanvasElement;
  //   this.context = this.canvas.getContext('2d')!;
  //   this.init();
  // }

  // private init() {
  //   const gradientColor = this.context.createLinearGradient(0, 0, 135, 135);
  //   gradientColor.addColorStop(0, '#267cee');
  //   gradientColor.addColorStop(1, '#6414e9');
  //   this.context.fillStyle = gradientColor;
  //   this.context.fillRect(0, 0, 200, 200);
  //   this.context.font = 'bold 14px Tahoma';
  //   this.context.fillStyle = '#fff';
  //   this.context.textAlign = 'center';
  //   this.context.fillText('Scratch & Win', 100, 40);
  //   this.context.font = '9px Tahoma';
  //   this.context.fillText('100% Guaranteed Offer', 100, 180);
  //   const img = new Image();
  //   img.onload = () => {
  //     this.context.drawImage(img, 50, 50, 100, 100);
  //   };
  //   img.src = 'https://img.icons8.com/?size=512&id=12191&format=png';
  // }

  // @HostListener('mousedown', ['$event'])
  // @HostListener('touchstart', ['$event'])
  // onStart(event: MouseEvent | TouchEvent) {
  //   this.isDragged = true;
  //   this.getXY(event);
  //   this.scratch(this.mouseX, this.mouseY);
  // }

  // @HostListener('mousemove', ['$event'])
  // @HostListener('touchmove', ['$event'])
  // onMove(event: MouseEvent | TouchEvent) {
  //   if (this.isDragged) {
  //     this.getXY(event);
  //     this.scratch(this.mouseX, this.mouseY);
  //   }
  // }

  // @HostListener('mouseup')
  // @HostListener('touchend')
  // onEnd() {
  //   this.isDragged = false;
  // }

  // @HostListener('mouseleave')
  // onMouseLeave() {
  //   this.isDragged = false;
  // }

  // private getXY(event: MouseEvent | TouchEvent) {
  //   if (event instanceof MouseEvent) {
  //     this.mouseX = event.pageX - this.canvas.getBoundingClientRect().left;
  //     this.mouseY = event.pageY - this.canvas.getBoundingClientRect().top;
  //   } else {
  //     this.mouseX = event.touches[0].pageX - this.canvas.getBoundingClientRect().left;
  //     this.mouseY = event.touches[0].pageY - this.canvas.getBoundingClientRect().top;
  //   }
  // }

  // private scratch(x: number, y: number) {
  //   this.context.globalCompositeOperation = 'destination-out';
  //   this.context.beginPath();
  //   this.context.arc(x, y, 40, 0, 2 * Math.PI);
  //   this.context.fill();
  // }

  // @HostListener('click')
  // onClick() {
  //   this.clickCount++;
  //   if (this.clickCount === 2) {
  //     const h3Text = (document.querySelector('h3') as HTMLElement).textContent!;
  //     (document.querySelector('h3') as HTMLElement).classList.add('copied');
  //     navigator.clipboard.writeText(h3Text);

  //     const popup = document.createElement('div');
  //     popup.innerText = 'Text copied to clipboard!';
  //     popup.style.position = 'fixed';
  //     popup.style.top = '50%';
  //     popup.style.left = '0';
  //     popup.style.padding = '10px';
  //     popup.style.background = '#333';
  //     popup.style.color = '#fff';
  //     popup.style.transform = 'translateX(-100%)';
  //     popup.style.transition = 'transform 0.5s ease-out';
  //     document.body.appendChild(popup);

  //     setTimeout(() => {
  //       popup.style.transform = 'translateX(0)';
  //     }, 100);

  //     setTimeout(() => {
  //       popup.style.transform = 'translateX(-100%)';
  //       this.clickCount = 0;
  //     }, 3000);
  //   }
  // }

}
