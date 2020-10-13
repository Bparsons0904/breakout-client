import { Injectable } from '@angular/core';
import { Room } from '../models/Room';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MessagesService } from './messages.service';

/**
 * Mutation for creating room
 */
const createRoom = gql`
  mutation createRoom(
    $name: String!
    $description: String!
    $website: String!
    $imageUrl: String!
    $companyId: ID!
  ) {
    createRoom(
      name: $name
      description: $description
      website: $website
      imageUrl: $imageUrl
      companyId: $companyId
    ) {
      id
      name
      description
      website
      imageUrl
      active
      companyId
    }
  }
`;

/**
 * Query for getting rooms
 */
const getRooms = gql`
  {
    rooms {
      id
      name
      description
      website
      imageUrl
      active
      companyId
      successes
      attempts
      fastest
    }
  }
`;

/**
 * Mutation for approving rooms
 */
const approveRoom = gql`
  mutation approveRoom($id: ID!) {
    approveRoom(id: $id) {
      id
      name
      description
      website
      imageUrl
      active
    }
  }
`;

/**
 * Mutation for approving rooms
 */
const removeRoom = gql`
  mutation removeRoom($id: ID!) {
    removeRoom(id: $id) {
      id
      name
      description
      website
      imageUrl
      active
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private rooms: BehaviorSubject<[Room]>;
  private registerSuccess: BehaviorSubject<Boolean>;
  constructor(
    private apollo: Apollo,
    private messagesService: MessagesService
  ) {
    this.rooms = new BehaviorSubject<[Room]>(null);
    this.registerSuccess = new BehaviorSubject<Boolean>(null);

    this.apollo
      .watchQuery<any>({
        query: getRooms,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.rooms.next(data.rooms);
        // If no data or does not include me data, set authentiation to false
        // if (data === null || data.me === null) {
        // } else if (data.me.id != null) {
        //   // If data includes a user id, it is authenticated
        //   this.userAuthenticated.next(true);
        //   this.loading.next(false);
        //   // this.userService.setUser(data.me);
        //   // if (!data.me.completedProfile) {
        //   //   this.router.navigate(['/createprofile']);
        //   // } else {
        //   //   // Return to home page
        //   //   this.router.navigate(['/']);
        //   // }
        // } else {
        //   // If data id isn't included, set to false
        //   this.userAuthenticated.next(false);
        //   this.loading.next(false);
        // }
      });
  }

  approveRoom(room: Room): void {
    this.messagesService.setInfoMessage(`Approving ${room.name}.`, 3000);
    this.apollo
      .mutate<any>({
        mutation: approveRoom,
        variables: {
          id: room.id,
        },
      })
      .subscribe(
        ({ data }) => {
          // // Set token to returned data value
          // const token = data['registerUser']['token'];
          // // Store token to local storage
          // localStorage.setItem('breakoutToken', token);
          // // Set authentication to true
          // this.userAuthenticated.next(true);
          // // Stop loading animation
          // this.loading.next(false);
          // // Return to home page
          // this.router.navigate(['/']);
          console.log(data);
          this.messagesService.clearInfoMessage();
          this.messagesService.setInfoMessage(
            `${room.name} has been Approved.`,
            3000
          );
          this.rooms.next(data.approveRoom);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          this.messagesService.setErrorMessage(
            `There was an error approving ${room.name}`
          );
          console.log('there was an error sending the query', error);
        }
      );
  }

  removeRoom(room: Room): void {
    this.messagesService.setInfoMessage(`Removing ${room.name}.`, 3000);
    this.apollo
      .mutate<any>({
        mutation: removeRoom,
        variables: {
          id: room.id,
        },
      })
      .subscribe(
        ({ data }) => {
          // // Set token to returned data value
          // const token = data['registerUser']['token'];
          // // Store token to local storage
          // localStorage.setItem('breakoutToken', token);
          // // Set authentication to true
          // this.userAuthenticated.next(true);
          // // Stop loading animation
          // this.loading.next(false);
          // // Return to home page
          // this.router.navigate(['/']);
          this.messagesService.clearInfoMessage();
          this.messagesService.setInfoMessage(
            `${room.name} has been Removed.`,
            3000
          );
          this.rooms.next(data.removeRoom);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          this.messagesService.setErrorMessage(
            `There was an error removing ${room.name}`
          );
          console.log('there was an error sending the query', error);
        }
      );
  }

  // queryCompanies(): void {
  //   console.log('Query rooms started');

  //   this.apollo
  //     .watchQuery<any>({
  //       query: getCompanies,
  //     })
  //     .valueChanges.subscribe(({ data, loading }) => {
  //       console.log(data);

  //       // this.rooms.next(data.rooms);
  //       // If no data or does not include me data, set authentiation to false
  //       // if (data === null || data.me === null) {
  //       // } else if (data.me.id != null) {
  //       //   // If data includes a user id, it is authenticated
  //       //   this.userAuthenticated.next(true);
  //       //   this.loading.next(false);
  //       //   // this.userService.setUser(data.me);
  //       //   // if (!data.me.completedProfile) {
  //       //   //   this.router.navigate(['/createprofile']);
  //       //   // } else {
  //       //   //   // Return to home page
  //       //   //   this.router.navigate(['/']);
  //       //   // }
  //       // } else {
  //       //   // If data id isn't included, set to false
  //       //   this.userAuthenticated.next(false);
  //       //   this.loading.next(false);
  //       // }
  //       console.log('Query rooms finished', this.rooms);
  //     });
  // }

  registerRoom(room: Room): void {
    this.messagesService.setInfoMessage(`Adding ${room.name}.`, 3000);
    // this.loading.next(true);
    this.apollo
      .mutate<any>({
        mutation: createRoom,
        variables: {
          ...room,
        },
      })
      .subscribe(
        ({ data }) => {
          // // Set token to returned data value
          // const token = data['registerUser']['token'];
          // // Store token to local storage
          // localStorage.setItem('breakoutToken', token);
          // // Set authentication to true
          // this.userAuthenticated.next(true);
          // // Stop loading animation
          // this.loading.next(false);
          // // Return to home page
          // this.router.navigate(['/']);
          this.registerSuccess.next(true);
          this.messagesService.clearInfoMessage();
          this.messagesService.setInfoMessage(
            `${room.name} has been Added.`,
            3000
          );
          this.rooms.next(data.createRoom);
          console.log(data);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          this.messagesService.setErrorMessage(
            `There was an error adding ${room.name}`
          );
          console.log('there was an error sending the query', error);
          this.registerSuccess.next(false);
        }
      );
  }

  clearRegisterSuccess(): void {
    this.registerSuccess.next(null);
  }

  getRegisterSuccess(): Observable<Boolean> {
    return this.registerSuccess.asObservable();
  }

  getRooms(): Observable<[Room]> {
    return this.rooms.asObservable();
  }
}
