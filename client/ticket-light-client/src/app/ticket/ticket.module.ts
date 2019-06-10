import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TicketComponent,TicketListComponent],
  exports:[TicketListComponent]
})
export class TicketModule { }
