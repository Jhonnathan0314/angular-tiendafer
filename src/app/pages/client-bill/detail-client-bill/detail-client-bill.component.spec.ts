import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientBillComponent } from './detail-client-bill.component';

describe('DetailClientBillComponent', () => {
  let component: DetailClientBillComponent;
  let fixture: ComponentFixture<DetailClientBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClientBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailClientBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
