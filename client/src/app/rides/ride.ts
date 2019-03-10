import {User} from "../users/user";

export class Ride {
  _id: string;
  driver: {User, vehicle};
  riders: User[];
  destination: string;
  origin: string;
  roundTrip: boolean;
  departure: Date;
  notes: string;
}
