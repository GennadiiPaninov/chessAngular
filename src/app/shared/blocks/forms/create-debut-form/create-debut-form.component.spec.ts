import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebutFormComponent } from './create-debut-form.component';

describe('CreateDebutFormComponent', () => {
  let component: CreateDebutFormComponent;
  let fixture: ComponentFixture<CreateDebutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDebutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDebutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
