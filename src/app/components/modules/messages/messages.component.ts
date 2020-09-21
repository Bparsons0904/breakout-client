import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public errorMessage: string = '';
  public infoMessage: string = '';

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messagesService
      .getErrorMessage()
      .subscribe((message) => (this.errorMessage = message));
    this.messagesService
      .getInfoMessage()
      .subscribe((message) => (this.infoMessage = message));
  }
}
