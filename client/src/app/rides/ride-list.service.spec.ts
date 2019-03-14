import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RideListService } from './ride-list.service';
import {HttpClient} from '@angular/common/http';
import {Ride} from './ride';

describe('Ride List Service', () => {

  describe('Ride list service: ', () => {
    // A small collection of test rides
    const testRides: Ride[] = [
      {
        _id: "5889598528c4748a0292e014",
        driver: "Hazel Beck",
        destination: "357 Imlay Street, Genoa, Washington, 1917",
        origin: "736 Rose Street, Castleton, Palau, 2897",
        departure: "7:40AM",
      },
      {
        _id: "58af3a600343927e48e87215",
        driver: "Burt Dixon",
        destination: "470 Lake Street, Tyro, Palau, 7754",
        origin: "809 Butler Street, Ladera, Kansas, 8788",
        departure: "1:34PM"
      },
      {
        _id: "58af3a600343927e48e87218",
        driver: "Ava Sanders",
        destination: "320 Driggs Avenue, Swartzville, Delaware, 8739",
        origin: "553 Vanderveer Street, Nicholson, Federated States Of Micronesia, 3611",
        departure: "4:20AM"
      },
    ];
    let rideListService: RideListService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      rideListService = new RideListService(httpClient);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('getRides() calls api/rides', () => {
      rideListService.getRides().subscribe(
        ride => expect(<Function>ride).toBe(testRides)
      );
      const req = httpTestingController.expectOne(rideListService.baseUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testRides);
    });

    it('getRideById() calls api/rides/id', () => {
      const targetRide: Ride = testRides[1];
      const targetId: string = targetRide._id;
      rideListService.getRideById(targetId).subscribe(
        todo => expect(todo).toBe(targetRide)
      );

      const expectedUrl: string = rideListService.baseUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(targetRide);
    });
  });
});

