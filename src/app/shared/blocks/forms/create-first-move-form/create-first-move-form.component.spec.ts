import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFirstMoveFormComponent } from './create-first-move-form.component';

describe('CreateFirstMoveFormComponent', () => {
  let component: CreateFirstMoveFormComponent;
  let fixture: ComponentFixture<CreateFirstMoveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFirstMoveFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFirstMoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
