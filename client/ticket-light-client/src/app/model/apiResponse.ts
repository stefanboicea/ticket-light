import { Ticket } from './ticket';


export interface ApiResponse { 
    tickets?: Array<Ticket>;
    ticket?: Ticket;
    internalStatusCode?: number;
    message: string;
    totalCount?: number;
    pageSize?: number;
}