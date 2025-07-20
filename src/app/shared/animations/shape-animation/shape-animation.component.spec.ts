import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeAnimationComponent } from './shape-animation.component';

describe('ShapeAnimationComponent', () => {
  let component: ShapeAnimationComponent;
  let fixture: ComponentFixture<ShapeAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
