import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampsComponent } from './bootcamps.component';

describe('BootcampsComponent', () => {
  let component: BootcampsComponent;
  let fixture: ComponentFixture<BootcampsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BootcampsComponent]
    });
    fixture = TestBed.createComponent(BootcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
