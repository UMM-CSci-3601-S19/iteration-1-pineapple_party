export class Ride {
  driver: {User, vehicle};
  riders: [Users];
  destination: string;
  origin: string;
  roundTrip: boolean;
  departure: dateTime;
  notes: string;
}
