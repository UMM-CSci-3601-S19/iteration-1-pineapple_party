import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Ride} from './ride';
import {environment} from '../../environments/environment';

@Injectable()
export class RideListService {
  readonly baseUrl: string = environment.API_URL + 'rides';
  private rideUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRides(rideDate?: string): Observable<Ride[]> {
    //this.filterByDate(rideDate);
    return this.http.get<Ride[]>(this.rideUrl);
  }

  getRideById(id: string): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + id);
  }

  filterByDate(rideDate?: string): void {
    if (!(rideDate == null || rideDate === '')) {
      if (this.parameterPresent('company=')) {
        // there was a previous search by company that we need to clear
        this.removeParameter('company=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'company=' + rideDate + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?company=' + rideDate + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('company=')) {
        let start = this.rideUrl.indexOf('company=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }
  }
  private parameterPresent(searchParam: string) {
    return this.rideUrl.indexOf(searchParam) !== -1;
  }

  private removeParameter(searchParam: string) {
    let start = this.rideUrl.indexOf(searchParam);
    let end = 0;
    if (this.rideUrl.indexOf('&') !== -1) {
      end = this.rideUrl.indexOf('&', start) + 1;
    } else {
      end = this.rideUrl.indexOf('&', start);
    }
    this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end);
  }

}
