import {User} from "../users/user";

export class Ride {
  driver: string;
  riders: User[];
  destination: string;
  origin: string;
  roundTrip: boolean;
  departure: Date;
  notes: string;
}
