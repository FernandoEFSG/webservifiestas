import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiñatasComponent } from './piñatas.component';

describe('InflablesComponent', () => {
  let component: PiñatasComponent;
  let fixture: ComponentFixture<PiñatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiñatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiñatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
