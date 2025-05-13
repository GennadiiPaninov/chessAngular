import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutsPageComponent } from './debuts-page.component';

describe('DebutsPageComponent', () => {
  let component: DebutsPageComponent;
  let fixture: ComponentFixture<DebutsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebutsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
