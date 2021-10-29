import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SillasMesasComponent } from './sillas-mesas.component';

describe('SillasMesasComponent', () => {
  let component: SillasMesasComponent;
  let fixture: ComponentFixture<SillasMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SillasMesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SillasMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
