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
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((data) => {
      console.log(data);
      this.companies = data;
    });
  }

  setApproval(company: Company, approval: boolean): void {
    console.log('Yeah baby');
  }
}
