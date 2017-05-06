import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorEditComponent } from './collector-edit.component';

describe('CollectorEditComponent', () => {
  let component: CollectorEditComponent;
  let fixture: ComponentFixture<CollectorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
