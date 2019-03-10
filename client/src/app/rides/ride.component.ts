import { Component, OnInit } from '@angular/core';
import {RideListService} from './ride-list.service';
import { Ride } from './ride';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {
  public ride: Ride = null;
  private id: string;

  constructor(private rideListService: RideListService) {
    // this.rides = this.rideListService.getRides();
  }

  private subscribeToServiceForId(){
    if (this.id){
      this.rideListService.getRideById(this.id).subscribe(
        ride => this.ride = ride,
        err => {
          console.log(err);
        }
      )
    }
  }

  setId(id: string){
    this.id = id;
    this.subscribeToServiceForId();
  }

  ngOnInit(): void {
    this.subscribeToServiceForId();
  }

}
