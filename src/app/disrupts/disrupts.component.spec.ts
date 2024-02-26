import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisruptsComponent } from './disrupts.component';

describe('DisruptsComponent', () => {
  let component: DisruptsComponent;
  let fixture: ComponentFixture<DisruptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisruptsComponent]
    });
    fixture = TestBed.createComponent(DisruptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
