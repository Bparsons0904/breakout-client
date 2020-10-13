/**
 * Model for a user
 */
// import { Room } from './Room';

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  wishlist?: [string];
  completedRooms?: [string];
  favorites?: [string];
  role?: string;
  successfulRooms?: number;
  failedRooms?: number;
}
