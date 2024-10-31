import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitieCardComponent } from './opportunitie-card.component';

describe('OpportunitieCardComponent', () => {
  let component: OpportunitieCardComponent;
  let fixture: ComponentFixture<OpportunitieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpportunitieCardComponent]
    });
    fixture = TestBed.createComponent(OpportunitieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
