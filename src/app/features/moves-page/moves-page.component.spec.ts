import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesPageComponent } from './moves-page.component';

describe('MovesPageComponent', () => {
  let component: MovesPageComponent;
  let fixture: ComponentFixture<MovesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
