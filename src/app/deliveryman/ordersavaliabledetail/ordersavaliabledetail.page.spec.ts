import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersavaliabledetailPage } from './ordersavaliabledetail.page';

describe('OrdersavaliabledetailPage', () => {
  let component: OrdersavaliabledetailPage;
  let fixture: ComponentFixture<OrdersavaliabledetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdersavaliabledetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
