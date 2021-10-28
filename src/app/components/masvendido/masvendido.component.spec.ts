import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasvendidoComponent } from './masvendido.component';

describe('MasvendidoComponent', () => {
  let component: MasvendidoComponent;
  let fixture: ComponentFixture<MasvendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasvendidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasvendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
