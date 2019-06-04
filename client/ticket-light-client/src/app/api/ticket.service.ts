
import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CollectionOfTicket } from '../model/collectionOfTicket';
import { OdataError } from '../model/odataError';
import { Ticket } from '../model/ticket';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class TicketService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Add new entity to Tickets
     * 
     * @param body New entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createTicket(body: Ticket, observe?: 'body', reportProgress?: boolean): Observable<Ticket>;
    public createTicket(body: Ticket, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Ticket>>;
    public createTicket(body: Ticket, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Ticket>>;
    public createTicket(body: Ticket, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createTicket.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<Ticket>(`${this.basePath}/Tickets`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete entity from Tickets
     * 
     * @param id key: Id
     * @param ifMatch ETag
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteTicket(id: number, ifMatch?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteTicket(id: number, ifMatch?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteTicket(id: number, ifMatch?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteTicket(id: number, ifMatch?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteTicket.');
        }


        let headers = this.defaultHeaders;
        if (ifMatch !== undefined && ifMatch !== null) {
            headers = headers.set('If-Match', String(ifMatch));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/Tickets(${encodeURIComponent(String(id))})`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get entity from Tickets by key
     * 
     * @param id key: Id
     * @param select Select properties to be returned
     * @param expand Expand related entities
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTicket(id: number, select?: Array<string>, expand?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Ticket>;
    public getTicket(id: number, select?: Array<string>, expand?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Ticket>>;
    public getTicket(id: number, select?: Array<string>, expand?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Ticket>>;
    public getTicket(id: number, select?: Array<string>, expand?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getTicket.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (select) {
            select.forEach((element) => {
                queryParameters = queryParameters.append('$select', <any>element);
            })
        }
        if (expand) {
            expand.forEach((element) => {
                queryParameters = queryParameters.append('$expand', <any>element);
            })
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Ticket>(`${this.basePath}/Tickets(${encodeURIComponent(String(id))})`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get entities from Tickets
     * 
     * @param top Show only the first n items
     * @param skip Skip the first n items
     * @param search Search items by search phrases
     * @param filter Filter items by property values
     * @param count Include count of items
     * @param orderby Order items by property values
     * @param select Select properties to be returned
     * @param expand Expand related entities
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listTicket(top?: number, skip?: number, search?: string, filter?: string, count?: boolean, orderby?: Array<string>, select?: Array<string>, expand?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<CollectionOfTicket>;
    public listTicket(top?: number, skip?: number, search?: string, filter?: string, count?: boolean, orderby?: Array<string>, select?: Array<string>, expand?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CollectionOfTicket>>;
    public listTicket(top?: number, skip?: number, search?: string, filter?: string, count?: boolean, orderby?: Array<string>, select?: Array<string>, expand?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CollectionOfTicket>>;
    public listTicket(top?: number, skip?: number, search?: string, filter?: string, count?: boolean, orderby?: Array<string>, select?: Array<string>, expand?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (top !== undefined && top !== null) {
            queryParameters = queryParameters.set('$top', <any>top);
        }
        if (skip !== undefined && skip !== null) {
            queryParameters = queryParameters.set('$skip', <any>skip);
        }
        if (search !== undefined && search !== null) {
            queryParameters = queryParameters.set('$search', <any>search);
        }
        if (filter !== undefined && filter !== null) {
            queryParameters = queryParameters.set('$filter', <any>filter);
        }
        if (count !== undefined && count !== null) {
            queryParameters = queryParameters.set('$count', <any>count);
        }
        if (orderby) {
            orderby.forEach((element) => {
                queryParameters = queryParameters.append('$orderby', <any>element);
            })
        }
        if (select) {
            select.forEach((element) => {
                queryParameters = queryParameters.append('$select', <any>element);
            })
        }
        if (expand) {
            expand.forEach((element) => {
                queryParameters = queryParameters.append('$expand', <any>element);
            })
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<CollectionOfTicket>(`${this.basePath}/Tickets`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update entity in Tickets
     * 
     * @param body New property values
     * @param id key: Id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateTicket(body: Ticket, id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateTicket(body: Ticket, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateTicket(body: Ticket, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateTicket(body: Ticket, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateTicket.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateTicket.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<any>(`${this.basePath}/Tickets(${encodeURIComponent(String(id))})`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
