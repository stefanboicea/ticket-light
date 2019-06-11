import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-resolution',
  templateUrl: './ticket-resolution.component.html',
  styleUrls: ['./ticket-resolution.component.scss']
})
export class TicketResolutionComponent implements OnInit {

  @Input() resolution:number;

  constructor() { }

  ngOnInit() {
  }

}
