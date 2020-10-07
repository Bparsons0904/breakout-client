import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
})
export class CompanyHomeComponent implements OnInit {
  public displayType: string;
  public companies: [Company];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    // this.companyService.getCompanies().subscribe((data) => {
    //   console.log(data);
    // });
  }

  display(displayType: string) {
    this.displayType = displayType;
  }
}
