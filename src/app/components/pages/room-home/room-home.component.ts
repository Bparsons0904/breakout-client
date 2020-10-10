import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-room-home',
  templateUrl: './room-home.component.html',
  styleUrls: ['./room-home.component.scss'],
})
export class RoomHomeComponent implements OnInit {
  public displayType: string;

  public isAuthenticated: boolean;
  public admin: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe((admin) => (this.admin = admin));
    this.authService
      .isAuthenticated()
      .subscribe((auth) => (this.isAuthenticated = auth));
  }

  display(displayType: string) {
    this.displayType = displayType;
  }
}
