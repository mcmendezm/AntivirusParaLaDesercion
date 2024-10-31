import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesSectionComponent } from './values-section.component';

describe('ValuesSectionComponent', () => {
  let component: ValuesSectionComponent;
  let fixture: ComponentFixture<ValuesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValuesSectionComponent]
    });
    fixture = TestBed.createComponent(ValuesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
