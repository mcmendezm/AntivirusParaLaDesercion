import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WompiButtonComponent } from './wompi-button.component';

describe('WompiButtonComponent', () => {
  let component: WompiButtonComponent;
  let fixture: ComponentFixture<WompiButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WompiButtonComponent]
    });
    fixture = TestBed.createComponent(WompiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
