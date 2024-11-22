import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiComponent } from './opportuniti.component';

describe('OpportunitiComponent', () => {
  let component: OpportunitiComponent;
  let fixture: ComponentFixture<OpportunitiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpportunitiComponent]
    });
    fixture = TestBed.createComponent(OpportunitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
