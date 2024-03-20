import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersalesPage } from './ordersales.page';

describe('OrdersalesPage', () => {
  let component: OrdersalesPage;
  let fixture: ComponentFixture<OrdersalesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdersalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
