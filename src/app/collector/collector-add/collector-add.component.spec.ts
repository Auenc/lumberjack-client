import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorAddComponent } from './collector-add.component';

describe('CollectorAddComponent', () => {
  let component: CollectorAddComponent;
  let fixture: ComponentFixture<CollectorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
