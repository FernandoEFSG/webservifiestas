import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizadoComponent } from './trab_personalizado.component';

describe('PersonalizadoComponent', () => {
  let component: PersonalizadoComponent;
  let fixture: ComponentFixture<PersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
