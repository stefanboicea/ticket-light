import { Component, OnInit } from '@angular/core';
import { TicketService } from '../api/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  summaryFilter:string = '';

  constructor(ticketService:TicketService) { 
    ticketService.listTicket(3,4,undefined,`Priority eq 1`).subscribe(results => console.log(results));
  }

  ngOnInit() {
  }

  search() {
    
  }
}
