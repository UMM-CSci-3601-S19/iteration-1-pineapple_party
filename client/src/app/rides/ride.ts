import {User} from "../users/user";
import DateTimeFormat = Intl.DateTimeFormat;

export class Ride {
  _id: string;
  driver: {User, vehicle};
  riders: User[];
  destination: string;
  origin: string;
  roundTrip: boolean;
  departure: string;
  notes: string;
}
