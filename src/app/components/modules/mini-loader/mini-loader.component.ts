import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-mini-loader',
  templateUrl: './mini-loader.component.html',
  styleUrls: ['./mini-loader.component.scss'],
})
export class MiniLoaderComponent implements OnInit {
  public loadingSmall: boolean;
  constructor(private messageService: MessagesService) {
    this.loadingSmall = true;
  }

  ngOnInit(): void {
    this.messageService.isLoadedSmall().subscribe((loading) => {
      console.log('We be loading');

      this.loadingSmall = loading;
    });
  }
}
