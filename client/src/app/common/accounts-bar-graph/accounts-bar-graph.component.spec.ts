import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBarGraphComponent } from './accounts-bar-graph.component';

describe('AccountsBarGraphComponent', () => {
  let component: AccountsBarGraphComponent;
  let fixture: ComponentFixture<AccountsBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBarGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
