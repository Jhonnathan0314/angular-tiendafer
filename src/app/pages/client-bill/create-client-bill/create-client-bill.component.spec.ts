import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientBillComponent } from './create-client-bill.component';

describe('CreateClientBillComponent', () => {
  let component: CreateClientBillComponent;
  let fixture: ComponentFixture<CreateClientBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClientBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
