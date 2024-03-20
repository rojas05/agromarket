import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainclientPage } from './mainclient.page';

describe('MainclientPage', () => {
  let component: MainclientPage;
  let fixture: ComponentFixture<MainclientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
