import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


interface BroadcastEvent {
  key: any;
  data?: any;
}
@Injectable()
export class Broadcaster {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  broadcast( key: any, data?: any ) {
    this._eventBus.next( { key, data } );
  }

  success( message: string ) {
    return this.broadcast( 'success', message );
  }

  on<T>( key: any ): Observable<T> {
    return this._eventBus.asObservable().pipe(
      filter( event => event.key === key ),
      map( event => <T>event.data )
      );
  }
}
