import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutsSortComponent } from './debuts-sort.component';

describe('DebutsSortComponent', () => {
  let component: DebutsSortComponent;
  let fixture: ComponentFixture<DebutsSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebutsSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebutsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
