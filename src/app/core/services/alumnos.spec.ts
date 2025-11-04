import { TestBed } from '@angular/core/testing';
import { Alumno } from './alumnos';


describe('Alumnos', () => {
  let service: Alumno;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = {} as Alumno;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
