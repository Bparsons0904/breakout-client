import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  /**
   * Submits user to be logged in
   */
  onSubmit(): void {
    this.authService.signIn(this.username, this.password);
  }
}
