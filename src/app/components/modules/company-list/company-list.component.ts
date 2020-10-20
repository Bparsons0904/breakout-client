import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/Company';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  public companies: [Company];
  public admin: boolean;
  constructor(
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((data) => {
      if (data !== null) {
        this.companies = data;
      }
    });
    this.authService.isAdmin().subscribe((admin) => (this.admin = admin));
  }

  removeCompany(company: Company): void {
    this.companyService.removeCompany(company);
  }
}
