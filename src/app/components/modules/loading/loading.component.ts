import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public loading: boolean;

  constructor(private messageService: MessagesService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.messageService.isLoaded().subscribe((loading) => {
      this.loading = loading;
    });
  }
}
