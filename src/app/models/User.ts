/**
 * Model for a user
 */
import { Room } from './Room';

export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  wishList?: [Room];
  completedRooms?: [Room];
  favorites?: [Room];
  role?: string;
  successfulRooms?: number;
  failedRooms?: number;
}
