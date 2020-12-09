import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberchatComponent } from './memberchat.component';

describe('MemberchatComponent', () => {
  let component: MemberchatComponent;
  let fixture: ComponentFixture<MemberchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
