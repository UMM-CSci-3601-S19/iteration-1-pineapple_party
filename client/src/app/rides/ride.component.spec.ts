import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ride } from "./ride";
import { RideComponent } from './ride.component';
import { RideListService } from './ride-list.service';
import { Observable } from 'rxjs/Observable';
import { CustomModule } from "../custom.module";


describe('Ride Component', () => {

  let rideComponent: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  let rideListServiceStub: {
    getRideById: (rideId: string) => Observable<Ride>
  };

  beforeEach(() => {
    rideListServiceStub = {
      getRideById: (rideId: string) => Observable.of([
        {
          _id: "one id",
          driver: "one driver",
          destination: "one destination",
          origin: "one origin",
          departure: "one departure"
        },
        {
          _id: "two id",
          driver: "two driver",
          destination: "two destination",
          origin: "two origin",
          departure: "two departure"
        },
        {
          _id: "three id",
          driver: "three driver",
          destination: "three destination",
          origin: "three origin",
          departure: "three departure"
        }
      ].find(ride => ride._id ===rideId))
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [RideComponent],
      providers: [{provide: RideListService, useValue: rideListServiceStub}]
    });
  });


  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RideComponent);
      rideComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve one by ID', () => {
    rideComponent.setId('one id');
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.driver).toBe('one driver');
    expect(rideComponent.ride.destination).toBe('one destination');
    expect(rideComponent.ride.origin).toBe('one origin');
    expect(rideComponent.ride.departure).toBe('one departure');
  });

  it('can retrieve two by ID', () => {
    rideComponent.setId('two id');
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.driver).toBe('two driver');
    expect(rideComponent.ride.destination).toBe('two destination');
    expect(rideComponent.ride.origin).toBe('two origin');
    expect(rideComponent.ride.departure).toBe('two departure');
  });

 it('returns undefined for four', () => {
   rideComponent.setId('four');
   expect(rideComponent.ride).not.toBeDefined();
  });

});
