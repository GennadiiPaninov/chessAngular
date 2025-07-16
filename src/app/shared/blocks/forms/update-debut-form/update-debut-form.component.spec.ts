import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDebutFormComponent } from './update-debut-form.component';

describe('UpdateDebutFormComponent', () => {
  let component: UpdateDebutFormComponent;
  let fixture: ComponentFixture<UpdateDebutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDebutFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDebutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
