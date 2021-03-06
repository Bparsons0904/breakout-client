import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Room } from '../models/Room';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomService } from './room.service';

/**
 * Mutation for registering user
 */
const createProfile = gql`
  mutation createProfile(
    $userId: String!
    $statement: String!
    $education: [JSON]!
    $workExperience: [JSON]!
    $lookingFor: [String]!
    $skills: [String]!
    $active: Boolean!
    $address1: String
    $address2: String
    $city: String!
    $state: String!
    $zip: Int!
    $country: String!
  ) {
    createProfile(
      userId: $userId
      statement: $statement
      education: $education
      workExperience: $workExperience
      lookingFor: $lookingFor
      skills: $skills
      active: $active
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
      country: $country
    ) {
      id
    }
  }
`;
/**
 * Mutation to update a user
 */
const updateWishlist = gql`
  mutation updateWishlist($id: ID, $add: Boolean) {
    updateWishlist(id: $id, add: $add) {
      id
      username
      email
      role
      wishlist
      completedRooms
      favorites
      successfulRooms
      failedRooms
    }
  }
`;
/**
 * Mutation to update a user
 */
const updateFavorite = gql`
  mutation updateFavorite($id: ID, $add: Boolean) {
    updateFavorite(id: $id, add: $add) {
      id
      username
      email
      role
      wishlist
      completedRooms
      favorites
      successfulRooms
      failedRooms
    }
  }
`;
/**
 * Mutation to update a user
 */
const updateCompletedRooms = gql`
  mutation updateCompletedRooms($id: ID, $add: Boolean) {
    updateCompletedRooms(id: $id, add: $add) {
      id
      username
      email
      role
      wishlist
      completedRooms
      favorites
      successfulRooms
      failedRooms
    }
  }
`;
/**
 * Mutation to update a user
 */
const updateUser = gql`
  mutation updateUser($id: ID!, $completedProfile: Boolean) {
    updateUser(id: $id, completedProfile: $completedProfile) {
      completedProfile
    }
  }
`;
/**
 * Query for getting current user profile
 */
const getUserProfile = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      statement
      education
      workExperience
      lookingFor
      skills
      active
      address1
      address2
      city
      state
      zip
      country
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<User>;
  private userDetails: User;
  private defaultUser: User = {
    id: '',
    username: '',
    email: '',
    role: '',
    wishlist: [''],
    completedRooms: [''],
    favorites: [''],
    successfulRooms: 0,
    failedRooms: 0,
  };

  private wishlist: BehaviorSubject<[Room]>;
  private rooms: [Room];
  // private userProfile: BehaviorSubject<UserProfile>;
  // private defaultProfile: UserProfile = {
  //   userId: '',
  //   statement: '',
  //   education: [],
  //   workExperience: [],
  //   lookingFor: [],
  //   skills: [],
  //   active: false,
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   state: '',
  //   zip: 0,
  //   country: '',
  // };
  constructor(
    private apollo: Apollo,
    private router: Router,
    private roomService: RoomService
  ) {
    // Init Observables
    // this.userProfile = new BehaviorSubject<UserProfile>(this.defaultProfile);
    this.user = new BehaviorSubject<User>(this.defaultUser);
    this.wishlist = new BehaviorSubject<[Room]>(null);
  }

  updateWishlist(room: Room, add: boolean) {
    const wishlist: any = room.id;
    this.apollo
      .mutate<any>({
        mutation: updateWishlist,
        variables: {
          id: wishlist,
          add: add,
        },
      })
      .subscribe(
        ({ data }) => {
          this.user.next({ ...data.updateWishlist });
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
  updateFavorite(room: Room, add: boolean) {
    const favorite: any = room.id;
    console.log(favorite);

    this.apollo
      .mutate<any>({
        mutation: updateFavorite,
        variables: {
          id: favorite,
          add: add,
        },
      })
      .subscribe(
        ({ data }) => {
          this.user.next({ ...data.updateFavorite });
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
  updateCompletedRooms(room: Room, add: boolean) {
    const completedRooms: any = room.id;
    this.apollo
      .mutate<any>({
        mutation: updateCompletedRooms,
        variables: {
          id: completedRooms,
          add: add,
        },
      })
      .subscribe(
        ({ data }) => {
          this.user.next({ ...data.updateCompletedRooms });
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  /**
   * Set both private user and observable user
   */
  setUser(user: User): void {
    this.user.next({ ...user });
    this.setRooms();
  }

  /**
   * Returns the current user data as observable
   */
  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  /**
   * Clears both private user and observable user
   */
  clearUser(): void {
    this.user.next({ ...this.defaultUser });
    this.userDetails = { ...this.defaultUser };
  }

  setRooms(): void {
    const user: User = this.user.getValue();
    this.roomService.getRooms().subscribe((rooms) => {
      if (rooms) {
        let roomArray: [Room];
        rooms.forEach((element) => {
          if (user.wishlist.includes(element.id)) {
            if (roomArray) {
              roomArray.push(element);
            } else {
              roomArray = [element];
            }
          }
        });
        this.wishlist.next(roomArray);
      }
    });
  }
  /**
   * Query and return user profile data as observable
   */
  // getUserProfile(): Observable<UserProfile> {
  //   this.apollo
  //     .watchQuery<any>({
  //       query: getUserProfile,
  //       variables: {
  //         userId: this.userDetails.id,
  //       },
  //     })
  //     .valueChanges.subscribe(({ data, loading }) => {
  //       this.userProfile.next(data.getUserProfile);
  //     });
  //   return this.userProfile.asObservable();
  // }

  /**
   * Create a user profile and set user to completed profile
   *
   * @param profile User profile data to create profile
   */
  // submitProfile(profile: UserProfile): void {
  //   // Set loading to true
  //   // this.authService.loading.next(true);
  //   // Start mutation query
  //   profile.userId = this.user.value.id;
  //   this.apollo
  //     .mutate({
  //       mutation: createProfile,
  //       variables: {
  //         ...profile,
  //       },
  //     })
  //     .subscribe(
  //       ({ data }) => {
  //         // Add data to user using deconstructor
  //         this.userProfile = { ...data['createdProfile'] };
  //         // Return to profile
  //         this.router.navigate(['/profile']);
  //       },
  //       (error) => {
  //         // Stop loading
  //         // this.authService.loading.next(true);
  //         console.log('there was an error sending the query', error);
  //       }
  //     );
  //   this.apollo
  //     .mutate({
  //       mutation: updateUser,
  //       variables: {
  //         id: this.userDetails.id,
  //         completedProfile: true,
  //       },
  //     })
  //     .subscribe(
  //       ({ data }) => {
  //         // Add data to user using deconstructor
  //         // this.userProfile = { ...data['createdProfile'] };
  //         // Return to profile
  //         // this.router.navigate(['/profile']);
  //         console.log(data);
  //       },
  //       (error) => {
  //         // Stop loading
  //         // this.authService.loading.next(true);
  //         console.log('there was an error sending the query', error);
  //       }
  //     );
  // }
}
