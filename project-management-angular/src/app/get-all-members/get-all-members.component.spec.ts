import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMembersComponent } from './get-all-members.component';

describe('GetAllMembersComponent', () => {
  let component: GetAllMembersComponent;
  let fixture: ComponentFixture<GetAllMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
