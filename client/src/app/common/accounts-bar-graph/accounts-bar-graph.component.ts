import { Component, OnInit } from '@angular/core';
import { NetWorthService } from 'src/app/core/services/net-worth.service';

@Component({
  selector: 'app-accounts-bar-graph',
  templateUrl: './accounts-bar-graph.component.html',
  styleUrls: ['./accounts-bar-graph.component.scss'],
})
export class AccountsBarGraphComponent implements OnInit {
  constructor(private netWorthService: NetWorthService) {}

  ngOnInit(): void {}
}
