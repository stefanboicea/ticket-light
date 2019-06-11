import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-priority',
  templateUrl: './ticket-priority.component.html',
  styleUrls: ['./ticket-priority.component.scss']
})
export class TicketPriorityComponent implements OnInit {

  @Input() priority:number;
  
  constructor() { }

  ngOnInit() {
  }

}
