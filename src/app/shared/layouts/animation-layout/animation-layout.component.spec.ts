import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationLayoutComponent } from './animation-layout.component';

describe('AnimationLayoutComponent', () => {
  let component: AnimationLayoutComponent;
  let fixture: ComponentFixture<AnimationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
