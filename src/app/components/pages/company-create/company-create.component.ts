import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company.service';
import { CompanyHomeComponent } from '../company-home/company-home.component';
@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss'],
})
export class CompanyCreateComponent implements OnInit {
  public company: Company = {
    name: '',
    description: '',
    location: '',
    website: '',
    imageUrl: '',
    active: false,
  };

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.companyService.register(this.company);
  }
}
