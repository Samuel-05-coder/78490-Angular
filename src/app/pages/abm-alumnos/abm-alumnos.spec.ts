import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAlumnos } from './abm-alumnos';

describe('AbmAlumnos', () => {
  let component: AbmAlumnos;
  let fixture: ComponentFixture<AbmAlumnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmAlumnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmAlumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
