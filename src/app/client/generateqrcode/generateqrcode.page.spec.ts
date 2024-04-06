import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateqrcodePage } from './generateqrcode.page';

describe('GenerateqrcodePage', () => {
  let component: GenerateqrcodePage;
  let fixture: ComponentFixture<GenerateqrcodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerateqrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
