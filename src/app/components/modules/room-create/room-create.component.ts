import { Component, OnInit } from '@angular/core';
import { Room } from '../../../models/Room';
import { RoomService } from '../../../services/room.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss'],
})
export class RoomCreateComponent implements OnInit {
  public room: Room = {
    name: '',
    description: '',
    website: '',
    imageUrl: '',
    companyId: '',
  };

  constructor(
    private roomService: RoomService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.messageService.setLoadingSmall(true);
    this.roomService.getRegisterSuccess().subscribe((result) => {
      if (result === true) {
        this.messageService.setLoadingSmall(false);
        this.messageService.setInfoMessage(`${this.room.name} has been added`);
        this.room = {
          name: '',
          description: '',
          website: '',
          imageUrl: '',

          companyId: '',
        };
      } else if (result === false) {
        this.messageService.setLoadingSmall(false);
        this.messageService.clearInfoMessage();
        this.messageService.setErrorMessage(`Error adding ${this.room.name}.`);
      }
    });
    this.roomService.registerRoom(this.room);
  }
}
