import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingstartedComponent } from './gettingstarted.component';

describe('GettingstartedComponent', () => {
  let component: GettingstartedComponent;
  let fixture: ComponentFixture<GettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettingstartedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
