import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Ride } from './ride';
import { Observable } from "rxjs/Observable";
import { CustomModule } from '../custom.module';

import { RideListComponent } from './ride-list.component';
import { RideListService } from "./ride-list.service";

describe('Display rides', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  let rideListServiceStub: {
    getRides: () => Observable<Ride[]>
  };

  beforeEach(() => {
    rideListServiceStub = {
      getRides: () => Observable.of([
        {_id: "1",
          driver: "Bob",
          riders: "Jill",
          destination: "Willies",
          origin: "Campus",
          roundTrip: true,
          departure: "10/08/2019 3:45",
          notes: "getting chips"
        },
        {_id: "12",
          driver: "Bobby",
          riders: "Jack",
          destination: "Bremer",
          origin: "Campus",
          roundTrip: true,
          departure: "10/08/2019 8:45",
          notes: "getting coins"
        },
         {_id: "3",
          driver: "Fran",
          riders: "Maria",
          destination: "St Cloud",
          origin: "4th street",
          roundTrip: false,
          departure: "12/18/2019 20:45",
          notes: "going home for winter break"
        }
      ])
    };

  TestBed.comfigureTestingModule({
    imports:[CustomModule],
    declarations: [RideListComponent],
    providers: [{provide: RideListService, useValue: rideListServiceStub}]
  });
});

  beforeEach(async(() => {
    Testbed.compileComponent().then(() => {
      fixture = TestBed.createComponent(RideListComponent);
      rideList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));


  it('contains all the rides', () => {
      expect(rideList.rides.length).toBe(3);
    });

  it('contain one with driver Bob ', () => {
    expect(rideList.rides.some((ride:Ride) => ride.driver === "Bob")).toBe(true);
  });

  it('contain one with driver Bobby ', () => {
    expect(rideList.rides.some((ride:Ride) => ride.driver === "Bobby")).toBe(true);
  });

  it('contain one with driver Fran ', () => {
    expect(rideList.rides.some((ride:Ride) => ride.driver === "Fran")).toBe(true);
  });

   it('NOT contain one with driver Phil ', () => {
    expect(rideList.rides.some((ride:Ride) => ride.driver === "Phil")).toBe(false);
  });


  it('contain one with destination Willies ', () => {
    expect(rideList.rides.some((ride:Ride) => ride.destination === "Willies")).toBe(true);
  });

  it('contain one with destination St Cloud ', () => {
    expect(rideList.rides.some((ride:Ride) => ride.destination === "St Cloud")).toBe(true);
  });

  it('contain one with destination bremer', () => {
    expect(rideList.rides.some((ride:Ride) => ride.destination === "Bremer")).toBe(true);
  });

  it('NOT contain one with destination Moon', () => {
    expect(rideList.rides.some((ride:Ride) => ride.destination === "Moon")).toBe(false);
  });

  it('NOT contain one with no round trip', () => {
    expect(rideList.rides.some((ride:Ride) => ride.roundTrip === false)).toBe(true);
  });

});
