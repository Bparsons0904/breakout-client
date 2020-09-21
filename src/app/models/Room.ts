/**
 * Model for a room
 */
export interface Room {
  id?: string;
  name: string;
  imageUrl: string;
  successes?: number;
  attempts?: number;
  fastest?: number;
}
