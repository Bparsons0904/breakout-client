import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/Company';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/Room';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  public id: string;
  public company: Company = null;
  public rooms: [Room?] = [];

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.companyService.getCompany(this.id).subscribe((company) => {
      if (company) {
        this.company = company;
      }
    });
    this.roomService.getRooms().subscribe((data) => {
      if (data !== null) {
        data.forEach((room) => {
          if (room?.companyId === this.id) {
            this.rooms.push(room);
          }
        });
      }
    });
  }
}
