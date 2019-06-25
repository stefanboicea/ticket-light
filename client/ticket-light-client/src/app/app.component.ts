import { Component, OnInit } from '@angular/core';
import { Broadcaster } from './core/broadcaster';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public broadcaster:Broadcaster, public snackBar: MatSnackBar ) {
    this.broadcaster.on<any>( 'error' ).subscribe( error => {
      this.snackBar.open(error.message , 'Error' );
  } );
  }
}
