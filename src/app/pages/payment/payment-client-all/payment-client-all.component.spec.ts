import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentClientAllComponent } from './payment-client-all.component';

describe('PaymentClientAllComponent', () => {
  let component: PaymentClientAllComponent;
  let fixture: ComponentFixture<PaymentClientAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentClientAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentClientAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
