import { Injectable } from '@angular/core';
import { TicketService } from '../api/api';

@Injectable()
export class SearchService {

constructor(public ticketService: TicketService) { }
  public search(top: number, skip: number,  filter: string) {
    return this.ticketService.listTicket(top,skip,undefined, filter || undefined);
  }
}
