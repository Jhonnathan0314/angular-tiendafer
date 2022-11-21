import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAllComponent } from './section-all.component';

describe('SectionAllComponent', () => {
  let component: SectionAllComponent;
  let fixture: ComponentFixture<SectionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
