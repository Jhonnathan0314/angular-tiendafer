import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentClientDetailComponent } from './payment-client-detail.component';

describe('PaymentClientDetailComponent', () => {
  let component: PaymentClientDetailComponent;
  let fixture: ComponentFixture<PaymentClientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentClientDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
