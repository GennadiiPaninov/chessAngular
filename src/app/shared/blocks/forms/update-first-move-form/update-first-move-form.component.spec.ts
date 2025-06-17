import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFirstMoveFormComponent } from './update-first-move-form.component';

describe('UpdateFirstMoveFormComponent', () => {
  let component: UpdateFirstMoveFormComponent;
  let fixture: ComponentFixture<UpdateFirstMoveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFirstMoveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFirstMoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
