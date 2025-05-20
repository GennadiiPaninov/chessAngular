import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutListComponent } from './debut-list.component';

describe('DebutListComponent', () => {
  let component: DebutListComponent;
  let fixture: ComponentFixture<DebutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebutListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
