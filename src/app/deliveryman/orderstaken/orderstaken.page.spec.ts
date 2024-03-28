import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderstakenPage } from './orderstaken.page';

describe('OrderstakenPage', () => {
  let component: OrderstakenPage;
  let fixture: ComponentFixture<OrderstakenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderstakenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
