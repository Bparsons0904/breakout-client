import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public loadingBig: boolean;

  constructor(private messageService: MessagesService) {
    this.loadingBig = true;
  }

  ngOnInit(): void {
    this.messageService.isLoadedBig().subscribe((loading) => {
      console.log('We be loading');

      this.loadingBig = loading;
    });
  }
}
