import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBillAllComponent } from './client-bill-all.component';

describe('ClientBillAllComponent', () => {
  let component: ClientBillAllComponent;
  let fixture: ComponentFixture<ClientBillAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBillAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBillAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
