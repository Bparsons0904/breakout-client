import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
})
export class CompanyHomeComponent implements OnInit {
  public displayType: string;

  public admin: boolean;

  constructor(
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.companyService.getCompanies().subscribe((data) => {
    //   console.log(data);
    // });
    this.authService.isAdmin().subscribe((admin) => (this.admin = admin));
  }

  display(displayType: string) {
    this.displayType = displayType;
  }
}
