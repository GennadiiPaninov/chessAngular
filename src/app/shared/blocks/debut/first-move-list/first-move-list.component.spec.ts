import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstMoveListComponent } from './first-move-list.component';

describe('FirstMoveListComponent', () => {
  let component: FirstMoveListComponent;
  let fixture: ComponentFixture<FirstMoveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstMoveListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstMoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
