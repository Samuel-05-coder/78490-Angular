import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCard } from './alumno-card';

describe('AlumnoCard', () => {
  let component: AlumnoCard;
  let fixture: ComponentFixture<AlumnoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
