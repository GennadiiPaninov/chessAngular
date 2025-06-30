import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMoveFormComponent } from './create-move-form.component';

describe('CreateMoveFormComponent', () => {
  let component: CreateMoveFormComponent;
  let fixture: ComponentFixture<CreateMoveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMoveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
