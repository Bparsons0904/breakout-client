import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/Room';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  public rooms: [Room];
  public admin: boolean;
  constructor(
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((data) => {
      console.log('List page ran', data);
      this.rooms = data;
    });
    this.authService.isAdmin().subscribe((admin) => (this.admin = admin));
  }
  removeRoom(room: Room): void {
    this.roomService.removeRoom(room);
  }
}
