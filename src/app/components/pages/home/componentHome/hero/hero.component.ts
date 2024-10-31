import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.removeSplineLogo();
  }

  private removeSplineLogo(): void {
    const splineViewer = this.el.nativeElement.querySelector('spline-viewer');

    if (splineViewer) {
      const interval = setInterval(() => {
        const shadowRoot = splineViewer.shadowRoot;
        const logoElement = shadowRoot?.querySelector('#logo');

        if (logoElement) {
          this.renderer.removeChild(shadowRoot, logoElement);
          clearInterval(interval);
        }
      }, 500); 
    }
  }
}
