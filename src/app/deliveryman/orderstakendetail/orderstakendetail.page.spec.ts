import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderstakendetailPage } from './orderstakendetail.page';

describe('OrderstakendetailPage', () => {
  let component: OrderstakendetailPage;
  let fixture: ComponentFixture<OrderstakendetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderstakendetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
