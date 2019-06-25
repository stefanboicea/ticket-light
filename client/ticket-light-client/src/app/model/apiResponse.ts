import { Ticket } from './ticket';


export interface ApiResponse { 
    items?: Array<Ticket>;
    internalStatusCode?: number;
    message: string;
    totalCount?: number;
    pageSize?: number;
}