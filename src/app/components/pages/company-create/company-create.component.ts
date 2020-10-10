import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company.service';
import { MessagesService } from '../../../services/messages.service';
// import { CompanyHomeComponent } from '../company-home/company-home.component';
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

  constructor(
    private companyService: CompanyService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.messageService.setLoadingSmall(true);
    this.companyService.getRegisterSuccess().subscribe((result) => {
      if (result === true) {
        this.messageService.setLoadingSmall(false);
        this.messageService.setInfoMessage(
          `${this.company.name} has been added`
        );
        this.company = {
          name: '',
          description: '',
          location: '',
          website: '',
          imageUrl: '',
          active: false,
        };
      } else if (result === false) {
        this.messageService.setLoadingSmall(false);
        this.messageService.clearInfoMessage();
        this.messageService.setErrorMessage(
          `Error adding ${this.company.name}.`
        );
      }
    });
    this.companyService.registerCompany(this.company);
  }
}
