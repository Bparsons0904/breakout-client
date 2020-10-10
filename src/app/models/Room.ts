/**
 * Model for a room
 */
export interface Room {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  website: string;
  active?: boolean;
  successes?: number;
  attempts?: number;
  fastest?: number;
  companyId?: string;
}
