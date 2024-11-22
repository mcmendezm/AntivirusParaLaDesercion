import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TematicComponent } from './tematic.component';

describe('TematicComponent', () => {
  let component: TematicComponent;
  let fixture: ComponentFixture<TematicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TematicComponent]
    });
    fixture = TestBed.createComponent(TematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
