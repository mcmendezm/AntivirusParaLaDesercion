import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  items = [
    { image: 'assets/images/Comfama-carrusel.jpg' },
    { image: 'assets/images/nodo-carrusel.jpg' },
    { image: 'assets/images/Sapiencia-carrusel.jpg' }
  ];
  currentIndex = 0;
  private intervalId: any;
  private readonly intervalTime = 3500;

  constructor() { }

  ngOnInit(): void { 
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  prev() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.items.length - 1;
    this.resetAutoSlide();
  }

  next() {
    this.currentIndex = (this.currentIndex < this.items.length - 1) ? this.currentIndex + 1 : 0;
    this.resetAutoSlide();
  }

  private resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  private startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.intervalTime);
  }

  private stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
