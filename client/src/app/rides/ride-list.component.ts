import { Component, OnInit } from '@angular/core';
import {RideListService} from './ride-list.service';
import {Ride} from './ride';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AddRideComponent} from './add-ride.component';

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
  public rideDestination: string;
  public rideOrigin: string;
  public rideRoundTrip: boolean;
  public rideDeparture: string;


  // The ID of the
  private highlightedID: string = '';

  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService, public dialog: MatDialog) {

  }

  isHighlighted(ride: Ride): boolean {
    return ride.destination['$oid'] === this.highlightedID;
  }

  openDialog(): void {
    const newRide: Ride = {_id: '', driver: '',destination: '', origin: '',/*roundTrip: null,*/ departure: ''/* notes: ''*/};
    const dialogRef = this.dialog.open(AddRideComponent, {
      width: '500px',
      data: {ride: newRide}
    });


    dialogRef.afterClosed().subscribe(newRide => {
      if (newRide != null) {

        this.rideListService.addNewRide(newRide).subscribe(
          result => {
            this.highlightedID = result;
            this.refreshRides();
          },
          err => {
            // This should probably be turned into some sort of meaningful response.
            console.log('There was an error adding the ride.');
            console.log('The newRide or dialogResult was ' + JSON.stringify(newRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }
  public filterRides(searchDriver: string, searchDestination: string, searchOrigin: string, searchRoundTrip: boolean, searchDeparture: string, ): Ride[] {
    this.filteredRides = this.rides;

    if (searchDriver != null) {
      searchDriver = searchDriver.toLocaleLowerCase();
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchDriver || ride.driver.toLowerCase().indexOf(searchDriver) !== -1;
      });
    }

    if (searchDestination != null) {
      searchDestination = searchDestination.toLocaleLowerCase();
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchDestination || ride.destination.toLowerCase().indexOf(searchDestination) !== -1;
      });
    }

    if (searchOrigin != null) {
      searchOrigin = searchOrigin.toLocaleLowerCase();
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchOrigin || ride.origin.toLowerCase().indexOf(searchOrigin) !== -1;
      });
    }

    if (searchDeparture != null) {
      searchDeparture = searchDeparture.toLocaleLowerCase();
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchDeparture || ride.departure.toLowerCase().indexOf(searchDeparture) !== -1;
      });
    }

    return this.filteredRides;

  }


  refreshRides(): Observable<Ride[]> {

    const rides: Observable<Ride[]> = this.rideListService.getRides();
    rides.subscribe(
      rides => {
        this.rides = rides;
        this.filterRides( this.rideDriver, this.rideDestination, this.rideOrigin, /* this.rideRoundTrip,*/ this.rideDeparture );
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
