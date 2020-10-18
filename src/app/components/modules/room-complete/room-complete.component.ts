import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { MessagesService } from '../../../services/messages.service';
@Component({
  selector: 'app-room-complete',
  templateUrl: './room-complete.component.html',
  styleUrls: ['./room-complete.component.scss'],
})
export class RoomCompleteComponent implements OnInit {
  @Input() private roomId: number;

  public time: string;

  constructor(
    private roomService: RoomService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.messageService.setLoadingSmall(true);
    this.time = this.time.replace(':', '');
    const time: number = parseInt(this.time);
    this.roomService.completeRoom(this.roomId, time);
  }
}
