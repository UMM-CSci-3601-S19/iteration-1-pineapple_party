import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Ride } from './ride';
import { Observable } from "rxjs/Observable";
import { CustomModule } from '../custom.module';

import { RideListComponent } from './ride-list.component';
import { RideListService } from "./ride-list.service";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

describe('Display rides', () => {
  let rideList: RideListComponent;
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
          departure: "3:45PM",
          notes: "getting chips"
        },
        {_id: "12",
          driver: "Bobby",
          riders: "Jack",
          destination: "Bremer",
          origin: "Campus",
          departure: "8:45PM",
          notes: "getting coins"
        },
         {_id: "3",
          driver: "Fran",
          riders: "Maria",
          destination: "St Cloud",
          origin: "4th street",
          departure: "20:45PM",
          notes: "going home for winter break"
        }
      ])
    };

  TestBed.configureTestingModule({
    imports:[CustomModule],
    declarations: [RideListComponent],
    providers: [{provide: RideListService, useValue: rideListServiceStub}]
  });
});

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
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

  it('ride list filters by driver', ()=> {
    expect(rideList.filteredRides.length).toBe(3);
    rideList.rideDriver = 'Bobby';
    const a: Observable<Ride[]> = rideList.refreshRides();
    a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
  });

  it('ride list filters by destination', () => {
    expect(rideList.filteredRides.length).toBe(3);
    rideList.rideDestination = 'Bremer';
    const a: Observable<Ride[]> = rideList.refreshRides();
    a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
  });

  it('ride list filters by origin', () => {
    expect(rideList.filteredRides.length).toBe(3);
    rideList.rideOrigin = 'Campus';
    const a: Observable<Ride[]> = rideList.refreshRides();
    a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(2));
  });

  it('ride list filters by departure', () => {
    expect(rideList.filteredRides.length).toBe(3);
    rideList.rideDeparture = '8:45PM';
    const a: Observable<Ride[]> = rideList.refreshRides();
    a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
  });
});
