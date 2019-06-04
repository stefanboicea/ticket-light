import { Component } from '@angular/core';
import { TicketService } from './api/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticket-light-client';
  constructor(ticketService: TicketService) {
    ticketService.listTicket().subscribe(results => console.log(results));
  }
}
