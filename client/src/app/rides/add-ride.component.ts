import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Ride} from './ride';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {DriverValidator} from "./driver.validator";

@Component({
  selector: 'add-ride.component',
  templateUrl: 'add-ride.component.html',
})
export class AddRideComponent implements OnInit {


  addRideForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ride: Ride }, private fb: FormBuilder) {
  }

  // not sure if this name is magical and making it be found or if I'm missing something,
  // but this is where the red text that shows up (when there is invalid input) comes from
  add_ride_validation_messages = {
    'driver': [
      {type: 'required', message: 'Driver is required'},
      {type: 'minlength', message: 'Driver must be at least 2 characters long'},
      {type: 'maxlength', message: 'Driver cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Driver must contain only numbers and letters'},
      {type: 'existingDriver', message: 'Driver has already been taken'}
    ],

    /*'status': [
      {type: 'pattern', message: 'Status must be complete or incomplete'},
      {type: 'required', message: 'status is required'}
    ],*/

    'destination': [
      {type: 'required', message: 'Destination is required'}
    ],

    'origin': [
      {type: 'required', message: 'Origin is required'}
    ],

    'departure': [
      {type: 'required', message: 'Departure-time is required'}
    ]
  };

  createForms() {
    this.addRideForm = this.fb.group({
      // We allow alphanumeric input and limit the length for name.
      driver: new FormControl('driver', Validators.compose([
        DriverValidator.validDriver,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.required
      ])),

      /*status: new FormControl('status', Validators.compose([
        /!*Validators.pattern('^[complete]+[incomplete]?'),*!/
        Validators.pattern('^[true]+[false]?'),
        Validators.required
      ])),*/

      destination: new FormControl('destination', Validators.compose([
        Validators.required
      ])),

      origin: new FormControl('origin', Validators.compose([
        Validators.required
      ])),

      departure: new FormControl('departure', Validators.compose([
        Validators.required
      ])),


    })

  }

  ngOnInit() {
    this.createForms();
  }

}
