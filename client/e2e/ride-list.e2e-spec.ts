import {RidePage} from './ride-list.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

// This line (combined with the function that follows) is here for us
// to be able to see what happens (part of slowing things down)
// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  // This delay is only put here so that you can watch the browser do its thing.
  // If you're tired of it taking long you can remove this call or change the delay
  // to something smaller (even 0).
  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(0);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('Ride list', () => {
  let page: RidePage;

  beforeEach(() => {
    page = new RidePage();
  });

  it('should get and highlight Rides title attribute ', () => {
    page.navigateTo();
    expect(page.getRideTitle()).toEqual('Rides');
  });

  it('should type something in filter driver box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeADriver('t');
    expect(page.getUniqueRide('Randolph Barrett')).toEqual('Randolph Barrett');
    expect(page.getUniqueRide('Burt Dixon')).toEqual('Burt Dixon');
    page.backspace();
    page.typeADriver('ver');
    expect(page.getUniqueRide('Vera Wynn')).toEqual('Vera Wynn');
  });

  it('should type something in filter destination box and check that it returned correct element ', () => {
    page.navigateTo();
    page.getRideByDestination('ri');

    expect(page.getUniqueRide('Emerson Klein')).toEqual('Emerson Klein');

    expect(page.getUniqueRide('Ava Sanders')).toEqual('Ava Sanders');
  });


  it('Should allow us to filter ride based on origin', () => {
    page.navigateTo();
    page.getOrigin('p');
    page.getRides().then((ride) => {
      expect(ride.length).toBe(4);
    });
    expect(page.getUniqueRide('Nieves Bray')).toEqual('Nieves Bray');
    expect(page.getUniqueRide('Hazel Beck')).toEqual('Hazel Beck');
    expect(page.getUniqueRide('Vera Wynn')).toEqual('Vera Wynn');
    expect(page.getUniqueRide('Emerson Klein')).toEqual('Emerson Klein');
  });

  it('Should allow us to clear a search for origin and then still successfully search again', () => {
    page.navigateTo();
    page.getOrigin('m');
    page.getRides().then((ride) => {
      expect(ride.length).toBe(4);
    });

    page.getOrigin('ne');
    page.getRides().then((ride) => {
      expect(ride.length).toBe(3);
    });
  });

  it('Should allow us to search for origin, update that search string, and then still successfully search', () => {
    page.navigateTo();
    page.getOrigin('o');
    page.getRides().then((ride) => {
      expect(ride.length).toBe(7);
    });
    page.field('rideOrigin').sendKeys('h');
    page.click('submit');
    page.getRides().then((ride) => {
      expect(ride.length).toBe(4);
    });
  });

// For examples testing modal dialog related things, see:
// https://code.tutsplus.com/tutorials/getting-started-with-end-to-end-testing-in-angular-using-protractor--cms-29318
// https://github.com/blizzerand/angular-protractor-demo/tree/final

  it('Should have an add ride button', () => {
    page.navigateTo();
    expect(page.elementExistsWithId('addNewRide')).toBeTruthy();
  });

  it('Should open a dialog box when add ride button is clicked', () => {
    page.navigateTo();
    expect(page.elementExistsWithCss('add-ride')).toBeFalsy('There should not be a modal window yet');
    page.click('addNewRide');
    expect(page.elementExistsWithCss('add-ride')).toBeTruthy('There should be a modal window now');
  });

  describe('Add Ride', () => {

    beforeEach(() => {
      page.navigateTo();
      page.click('addNewRide');
    });

    it('Should actually add the ride with the information we put in the fields', () => {
      page.navigateTo();
      page.click('addNewRide');
      page.field('rideDriver').sendKeys('Tracy Kim');
      // Need to clear the destination field because the default value is -1.
      page.field('rideDestination').sendKeys('MOA');
      page.field('rideOrigin').sendKeys('Awesome Startup, LLC');
      page.field('rideDeparture').sendKeys('5:00PM');
      expect(page.button('confirmAddRideButton').isEnabled()).toBe(true);
      page.click('confirmAddRideButton');

      /*
       * This tells the browser to wait until the (new) element with ID
       * 'tracy@awesome.com' becomes present, or until 10,000ms whichever
       * comes first. This allows the test to wait for the server to respond,
       * and then for the client to display this new ride.
       * http://www.protractortest.org/#/api?view=ProtractorExpectedConditions
       */
      const tracy_element = element(by.id('Awesome Startup, LLC'));
      browser.wait(protractor.ExpectedConditions.presenceOf(tracy_element), 10000);

      expect(page.getUniqueRide('Tracy Kim')).toMatch('Tracy Kim.*'); // toEqual('Tracy Kim');
    });

    describe('Add Ride (Validation)', () => {

      afterEach(() => {
        page.click('exitWithoutAddingButton');
      });

      it('Should allow us to put information into the fields of the add ride dialog', () => {
        expect(page.field('rideDriver').isPresent()).toBeTruthy('There should be a driver field');
        page.field('rideDriver').sendKeys('Dana Jones');
        expect(element(by.id('rideDestination')).isPresent()).toBeTruthy('There should be a destination field');
        // Need to clear this field because the default value is -1.
        page.field('rideDestination').clear();
        page.field('rideDestination').sendKeys('St. Cloud');
        expect(page.field('rideOrigin').isPresent()).toBeTruthy('There should be an origin field');
        page.field('rideOrigin').sendKeys('Awesome Startup, LLC');
        expect(page.field('rideDeparture').isPresent()).toBeTruthy('There should be a departure field');
        page.field('rideDeparture').sendKeys('6:00PM');
      });


      it('Should show the validation error message about destination being required', () => {
        expect(element(by.id('rideDestination')).isPresent()).toBeTruthy('There should be an destination field');
        page.field('rideDestination').clear();
        expect(page.button('confirmAddRideButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('rideDriver').click();
        expect(page.getTextFromField('destination-error')).toBe('Destination is required');
      });

      it('Should show the validation error message about driver being required', () => {
        expect(element(by.id('rideDriver')).isPresent()).toBeTruthy('There should be a driver field');
        // '\b' is a backspace, so this enters an 'A' and removes it so this
        // field is "dirty", i.e., it's seen as having changed so the validation
        // tests are run.
        page.field('rideDriver').sendKeys('A\b');
        expect(page.button('confirmAddRideButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('rideDestination').click();
        expect(page.getTextFromField('driver-error')).toBe('Driver is required');
      });

      it('Should show the validation error message about the format of driver', () => {
        expect(element(by.id('rideDriver')).isPresent()).toBeTruthy('There should be an driver field');
        page.field('rideDriver').sendKeys('Don@ld Jones');
        expect(page.button('confirmAddRideButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('rideDestination').click();
        expect(page.getTextFromField('driver-error')).toBe('Driver must contain only numbers and letters');
      });

    });
  });
});

