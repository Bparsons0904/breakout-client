import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/Company';

@Component({
  selector: 'app-company-approve',
  templateUrl: './company-approve.component.html',
  styleUrls: ['./company-approve.component.scss'],
})
export class CompanyApproveComponent implements OnInit {
  public companies: [Company];
  public toApprove: number = 0;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      data.forEach((company) => {
        if (company !== null && !company.active) {
          this.toApprove++;
        }
      });
    });
  }

  setApproval(company: Company): void {
    this.toApprove--;
    this.companyService.approveCompany(company);
  }

  denyApproval(company: Company): void {
    this.toApprove--;
    this.companyService.removeCompany(company);
  }
}
