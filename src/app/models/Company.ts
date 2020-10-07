/**
 * Model for a company
 */
import { Room } from './Room';

export interface Company {
  id?: string;
  name: string;
  description: string;
  location: string;
  website: string;
  imageUrl: string;
  active: boolean;
  rooms?: [Room];
}
