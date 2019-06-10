import { Component, OnInit } from '@angular/core';
import { TicketService } from '../api/api';
import { Member, Resolution, Priority, Ticket } from '../model/models';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import filterBuilder from 'odata-filter-builder';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  members: Member[] = [
    { id: 1, fullName: 'Aristotel Epictetus' },
    { id: 2, fullName: 'Ramón Cahenzli' },
    { id: 3, fullName: 'Stefan Boicea' },
    { id: 4, fullName: 'David Wheeler' },
    { id: 5, fullName: 'Emily Ratliff' },
    { id: 6, fullName: 'Jason Gillman Jr.' },
    { id: 7, fullName: 'Tony Davis' },
    { id: 8, fullName: 'Alan Robertson' },
    { id: 9, fullName: 'Sheldon Gill' },
    { id: 10, fullName: 'J.C.' },
    { id: 11, fullName: 'Michael Schmitt' },
    { id: 12, fullName: 'Ken Schumacher' },
    { id: 13, fullName: 'Nigel Small' },
    { id: 14, fullName: 'Carrie Oswald' },
    { id: 15, fullName: 'Dave Quigley' },
    { id: 16, fullName: 'Santiago Newbery' }
  ];

  resolutions: Resolution[] = [
    { id: 0, name: 'Backlog' },
    { id: 1, name: 'Pending' },
    { id: 2, name: 'InProgress' },
    { id: 3, name: 'Done' },
    { id: 4, name: 'Fixed' }
  ];
  priorities: Priority[] = [
    { id: 0, name: 'Low' },
    { id: 1, name: 'Medium' },
    { id: 2, name: 'High' }
  ];

  tickets:Ticket[];


  asigneeControl = new FormControl();
  reporterControl = new FormControl();
  priorityControl = new FormControl();
  resolutionControl = new FormControl();
  summaryControl = new FormControl();
  

  constructor(public ticketService: TicketService) {
    this.ticketService.listTicket(3, 4, undefined, undefined,true)
    .subscribe(response => {
      this.tickets = response.tickets;
    });

  }


  search() {
    console.log(this.asigneeControl.value);
    console.log(this.reporterControl.value);
    console.log(this.priorityControl.value);
    console.log(this.summaryControl.value);

    const filter = filterBuilder().eq('Priority', 'High').toString();
    
  }

  reset() {
    this.asigneeControl.reset();
    this.reporterControl.reset();
    this.priorityControl.reset();
    this.resolutionControl.reset();
    this.summaryControl.reset();
  }


  filteredAsignees: Observable<Member[]>;
  filteredReporters: Observable<Member[]>;

  ngOnInit() {
    this.filteredAsignees = this.asigneeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? value.fullName : undefined),
        map(name => name ? this.filterMember(name) : this.members.slice())
      );

    this.filteredReporters = this.reporterControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? value.fullName : undefined),
        map(name => name ? this.filterMember(name) : this.members.slice())
      );
  }

  displayMember(member?: Member): string | undefined {
    return member ? member.fullName : undefined;
  }

  private filterMember(name: string): Member[] {
    const filterValue = name.toLowerCase();

    return this.members.filter(option =>
      new RegExp(`^${filterValue}`, 'gi')
        .test(option.fullName));
  }



  memberDisplay(member): string {
    return member ? member.name : '';
  }

  
}
