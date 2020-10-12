import { Component, OnInit } from '@angular/core';
import { Room } from '../../../models/Room';
import { RoomService } from '../../../services/room.service';
import { MessagesService } from '../../../services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/Company';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss'],
})
export class RoomCreateComponent implements OnInit {
  public room: Room = {
    name: '',
    description: '',
    website: '',
    imageUrl: '',
    companyId: '',
  };
  public id: string;
  public companies: [Company?] = null;

  constructor(
    private roomService: RoomService,
    private messageService: MessagesService,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.route.params.subscribe((params) => {
      if (params?.id) {
        this.room.companyId = params.id;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.room);

    if (this.room.companyId === '') {
      this.companyService.getCompanies().subscribe((companies) => {
        if (companies) {
          this.companies = companies;
          console.log(this.companies);
        }
      });
    }
  }

  onSubmit(): void {
    this.messageService.setLoadingSmall(true);
    this.roomService.getRegisterSuccess().subscribe((result) => {
      if (result === true) {
        this.messageService.setLoadingSmall(false);
        this.messageService.setInfoMessage(`${this.room.name} has been added`);
        this.room = {
          name: '',
          description: '',
          website: '',
          imageUrl: '',
          companyId: '',
        };
      } else if (result === false) {
        this.messageService.setLoadingSmall(false);
        this.messageService.clearInfoMessage();
        this.messageService.setErrorMessage(`Error adding ${this.room.name}.`);
      }
    });
    this.roomService.registerRoom(this.room);
  }
}
