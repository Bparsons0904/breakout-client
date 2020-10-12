import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/Room';

@Component({
  selector: 'app-room-approve',
  templateUrl: './room-approve.component.html',
  styleUrls: ['./room-approve.component.scss'],
})
export class RoomApproveComponent implements OnInit {
  public rooms: [Room] = null;
  public toApprove: number = 0;
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((data) => {
      console.log(data);

      if (data !== null) {
        this.rooms = data;
        data.forEach((room) => {
          if (room !== null && !room.active) {
            this.toApprove++;
          }
        });
      }
    });
  }

  setApproval(room: Room): void {
    this.toApprove--;
    this.roomService.approveRoom(room);
  }

  denyApproval(room: Room): void {
    this.toApprove--;
    this.roomService.removeRoom(room);
  }
}
