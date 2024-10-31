import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent implements AfterViewInit {

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
          clearInterval(interval); // Detén la verificación una vez que el logo se haya eliminado
        }
      }, 500); // Verifica cada 500ms
    }
  }
}
