import { Component, OnInit } from '@angular/core';
import {RideListService} from './ride-list.service';
import {Ride} from './ride';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ride-list-component',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})

export class RideListComponent implements OnInit {

  public rides: Ride[];
  public filteredRides: Ride[];

  // These are the target values used in searching.
  // We should rename them to make that clearer.
  public rideDriver: string;
  public rideRiders: string;
  public rideDestination: string;
  public rideOrigin: string;
  public rideRoundTrip: boolean;
  public rideDeparture: Date;
  public rideNotes: string;

  // The ID of the
  private highlightedID: string = '';

  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService, public dialog: MatDialog) {

  }

  isHighlighted(ride: Ride): boolean {
    return ride.destination['$oid'] === this.highlightedID;
  }


  refreshRides(): Observable<Ride[]> {

    const rides: Observable<Ride[]> = this.rideListService.getRides();
    rides.subscribe(
      rides => {
        this.rides = rides;
        // this.filterRides(this.rideDrive, this.rideAge);
      },
      err => {
        console.log(err);
      });
    return rides;
  }

  loadService(): void {
    this.rideListService.getRides(this.rideDestination).subscribe(
      rides => {
        this.rides = rides;
        this.filteredRides = this.rides;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.refreshRides();
    this.loadService();
  }
}
