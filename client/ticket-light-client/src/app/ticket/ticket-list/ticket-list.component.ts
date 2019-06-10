import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from  '../../model/models';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  @Input() tickets:Ticket[];

  constructor() { }

  ngOnInit() {
  }

}
