import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocteleríaComponent } from './coctelería.component';

describe('CocteleríaComponent', () => {
  let component: CocteleríaComponent;
  let fixture: ComponentFixture<CocteleríaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocteleríaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocteleríaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
