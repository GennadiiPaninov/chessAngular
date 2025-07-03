import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMoveFormComponent } from './update-move-form.component';

describe('UpdateMoveFormComponent', () => {
  let component: UpdateMoveFormComponent;
  let fixture: ComponentFixture<UpdateMoveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMoveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
