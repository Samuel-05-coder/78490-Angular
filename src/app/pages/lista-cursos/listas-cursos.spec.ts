import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasCursos } from './listas-cursos';

describe('ListasCursos', () => {
  let component: ListasCursos;
  let fixture: ComponentFixture<ListasCursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListasCursos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasCursos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
