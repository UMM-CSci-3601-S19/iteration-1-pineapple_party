import {User} from "../users/user";

export class Ride {
  driver: {User, vehicle};
  riders: User[];
  destination: string;
  origin: string;
  roundTrip: boolean;
  departure: Date;
  notes: string;
}
