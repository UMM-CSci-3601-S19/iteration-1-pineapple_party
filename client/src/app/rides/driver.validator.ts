import {FormControl} from '@angular/forms';

export class DriverValidator {

  // This example is here to show that you can provide a validator
  // of your own. This example checks if the name entered is 'abc123' or '123abc',
  // which are clearly very special names that are already taken. Realistically,
  // you'd want to check against a database for already-taken names.
  static validDriver(fc: FormControl) {
    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
      return ({
        existingDriver: true,
      });
    } else {
      return null;

    }
  }
}
