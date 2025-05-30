import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalsComponent } from './delete-modals.component';

describe('DeleteModalsComponent', () => {
  let component: DeleteModalsComponent;
  let fixture: ComponentFixture<DeleteModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
