import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { MaterialModule } from '../material.module';
import { TicketResolutionComponent } from './ticket-resolution/ticket-resolution.component';
import { TicketPriorityComponent } from './ticket-priority/ticket-priority.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TicketComponent,TicketListComponent,TicketResolutionComponent,TicketPriorityComponent],
  exports:[TicketListComponent]
})
export class TicketModule { }
