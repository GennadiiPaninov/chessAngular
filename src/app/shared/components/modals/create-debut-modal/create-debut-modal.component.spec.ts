import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebutModalComponent } from './create-debut-modal.component';

describe('CreateDebutModalComponent', () => {
  let component: CreateDebutModalComponent;
  let fixture: ComponentFixture<CreateDebutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDebutModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDebutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
