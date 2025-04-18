import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLoaderComponent } from './route-loader.component';

describe('RouteLoaderComponent', () => {
  let component: RouteLoaderComponent;
  let fixture: ComponentFixture<RouteLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
