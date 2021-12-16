import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAccordionComponent } from './transaction-accordion.component';

describe('TransactionAccordionComponent', () => {
  let component: TransactionAccordionComponent;
  let fixture: ComponentFixture<TransactionAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
