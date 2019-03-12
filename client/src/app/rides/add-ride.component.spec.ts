import {AddRideComponent} from "./add-ride.component";

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialogRef, MAT_DIALOG_DATA, MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import {CustomModule} from '../custom.module';
import {By} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";

describe('Add ride Component', () =>{

  let addRideComponent: AddRideComponent;
  let calledClose : boolean;
  const mockMatDialogRef = {
    close() {
      calledClose = true;
    }
  };
  let fixture: ComponentFixture<AddRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [AddRideComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockMatDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: null},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(AddRideComponent);
    addRideComponent = fixture.componentInstance;
  });



  it('should not allow a driver to contain a symbol'), async(() => {
    let fixture = TestBed.createComponent(AddRideComponent);
    let debug = fixture.debugElement;
    let input = debug.query(By.css('[driver=destination]'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input.nativeElement.value = 'Bad Place';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      let form: NgForm = debug.children[0].injector.get(NgForm);
      let control = form.control.get('destination');
      expect(control.hasError('notPeeskillet')).toBe(true);
      expect(form.control.valid).toEqual(false);
      expect(form.control.hasError('notPeeskillet', ['destination'])).toEqual(true);

      input.nativeElement.value = 'Another Place';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      expect(control.hasError('notPeeskillet')).toBe(false);
      expect(form.control.valid).toEqual(true);
      expect(form.control.hasError('notPeeskillet', ['destination'])).toEqual(false);
    });
  });


});
