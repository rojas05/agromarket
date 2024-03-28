import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaindeliveryPage } from './maindelivery.page';

describe('MaindeliveryPage', () => {
  let component: MaindeliveryPage;
  let fixture: ComponentFixture<MaindeliveryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaindeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
