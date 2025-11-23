import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MainLayoutComponent } from './main-layout';
import { NavbarComponent } from '../navbar/navbar';
import { ToolbarComponent } from '../toolbar/toolbar';
import { provideMockStore } from '@ngrx/store/testing';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent, NavbarComponent, ToolbarComponent],
      imports: [MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [provideMockStore({ initialState: { auth: { user: null, loading: false, error: null } } })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
