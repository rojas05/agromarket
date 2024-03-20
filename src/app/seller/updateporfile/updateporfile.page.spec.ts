import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateporfilePage } from './updateporfile.page';

describe('UpdateporfilePage', () => {
  let component: UpdateporfilePage;
  let fixture: ComponentFixture<UpdateporfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateporfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
