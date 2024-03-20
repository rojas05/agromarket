import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateproducPage } from './updateproduc.page';

describe('UpdateproducPage', () => {
  let component: UpdateproducPage;
  let fixture: ComponentFixture<UpdateproducPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateproducPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
