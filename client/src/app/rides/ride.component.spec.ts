// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {Ride} from './ride';
// import {RideComponent} from './ride.component';
// import {RideListService} from './ride-list.service';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
//
//
// describe('Ride component', () => {
//
//   let rideComponent: RideComponent;
//   let fixture: ComponentFixture<RideComponent>;
//
//   let rideListServiceStub: {
//     getRideById: (rideId: string) => Observable<Ride>
//   };
//
//   beforeEach(() => {
//     // stub RideService for test purposes
//     rideListServiceStub = {
//       getRideById: (rideId: string) => Observable.of([
//         {
//           _id: 'Angeline_id',
//           driver: "Angeline Norman",
//           destination: "673 Hyman Court, Verdi, Wyoming, 485",
//           origin: "610 Caton Avenue, Brule, North Carolina, 5710",
//           departure: "2:11PM",
//         },
//
//         {
//           _id: 'nieves bray_id',
//           driver: "Nieves Bray",
//           destination: "854 Howard Alley, Belfair, Virginia, 8736",
//           origin: "237 Hillel Place, Biddle, Illinois, 2851",
//           departure: "4:23AM",
//         },
//         {
//           _id: 'hazel beck_id',
//           driver: "Hazel Beck",
//           destination: "357 Imlay Street, Genoa, Washington, 1917",
//           origin: "736 Rose Street, Castleton, Palau, 2897",
//           departure: "7:40AM",
//         }
//       ].find(ride => ride._id === rideId))
//     };
//
//     TestBed.configureTestingModule({
//       declarations: [RideComponent],
//       providers: [{provide: RideListService, useValue: rideListServiceStub}]
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(RideComponent);
//       rideComponent = fixture.componentInstance;
//     });
//   }));
//
//   it('can retrieve Angeline Norman by ID', () => {
//     rideComponent.setId('Angeline_id');
//     expect(rideComponent.ride).toBeDefined();
//     expect(rideComponent.ride.driver).toBe('Angeline Norman');
//     expect(rideComponent.ride.destination).toBe('673 Hyman Court, Verdi, Wyoming, 485');
//   });
//
//   it('returns undefined for Santa', () => {
//     rideComponent.setId('Santa');
//     expect(rideComponent.ride).not.toBeDefined();
//   });
//
// });
