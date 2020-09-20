import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public loading: boolean;

  constructor(private authService: AuthService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.authService.isLoaded().subscribe((loading) => {
      this.loading = loading;
    });
  }
}
