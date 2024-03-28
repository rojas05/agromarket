import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersavaliablePage } from './ordersavaliable.page';

describe('OrdersavaliablePage', () => {
  let component: OrdersavaliablePage;
  let fixture: ComponentFixture<OrdersavaliablePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdersavaliablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
