import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/Room';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  public rooms: [Room];
  public admin: boolean;
  public user: User;

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.roomService.getRooms().subscribe((rooms) => {
          rooms.forEach((room) => {
            if (user.wishlist.includes(room.id)) {
              room.wishlist = true;
            }
            if (user.favorites.includes(room.id)) {
              room.favorite = true;
            }
            if (user.completedRooms.includes(room.id)) {
              room.completed = true;
            }
          });
          this.rooms = rooms;
        });
      }
    });

    this.authService.isAdmin().subscribe((admin) => (this.admin = admin));
  }
  removeRoom(room: Room): void {
    this.roomService.removeRoom(room);
  }

  updateWishlist(room: Room, add: boolean): void {
    this.userService.updateWishlist(room, add);
    this.rooms.forEach((element) => {
      if (element.id === room.id) {
        element.wishlist = add;
      }
    });
  }
  updateFavorite(room: Room, add: boolean): void {
    this.userService.updateFavorite(room, add);
    this.rooms.forEach((element) => {
      if (element.id === room.id) {
        element.favorite = add;
      }
    });
  }
  updateCompletedRooms(room: Room, add: boolean): void {
    this.userService.updateCompletedRooms(room, add);
    this.rooms.forEach((element) => {
      if (element.id === room.id) {
        element.completed = add;
      }
    });
  }
}
