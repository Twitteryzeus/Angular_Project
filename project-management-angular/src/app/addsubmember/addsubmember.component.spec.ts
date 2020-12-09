import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubmemberComponent } from './addsubmember.component';

describe('AddsubmemberComponent', () => {
  let component: AddsubmemberComponent;
  let fixture: ComponentFixture<AddsubmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubmemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
