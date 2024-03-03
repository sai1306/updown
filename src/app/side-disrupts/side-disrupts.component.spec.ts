import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDisruptsComponent } from './side-disrupts.component';

describe('SideDisruptsComponent', () => {
  let component: SideDisruptsComponent;
  let fixture: ComponentFixture<SideDisruptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideDisruptsComponent]
    });
    fixture = TestBed.createComponent(SideDisruptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
