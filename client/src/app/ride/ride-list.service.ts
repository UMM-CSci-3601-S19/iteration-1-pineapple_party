import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Ride} from './ride';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RideListService {
  readonly baseUrl: string = environment.API_URL + 'rides';
  private rideUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRides(rideDestination?: string): Observable<Ride[]> {
    this.filterByDestination(rideDestination);
    return this.http.get<Ride[]>(this.rideUrl);
  }
}
