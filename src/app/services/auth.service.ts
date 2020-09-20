import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../models/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';

/**
 * Query for getting current user
 */
const getMe = gql`
  {
    me {
      id
    }
  }
`;
/**
 * Mutation for registering user
 */
const registerUser = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
    $email: String!
    $phoneNumber: String
    $role: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      role: $role
    ) {
      user {
        id
      }
      token
    }
  }
`;
/**
 * Query for getting current user
 */
const signIn = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(login: $username, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated: BehaviorSubject<boolean>;
  public loading: BehaviorSubject<boolean>;
  private user: User;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private userService: UserService
  ) {
    // Initialize the observable variables with default values
    this.userAuthenticated = new BehaviorSubject<boolean>(false);
    this.loading = new BehaviorSubject<boolean>(true);

    /**
     * This is the 1st type of query, use when a observable is not needed/desired
     */

    // this.checkMe = this.apollo.watchQuery({ query: getMe }).valueChanges.pipe(
    //   map(({ data }) => {
    //     console.log('me is working', data);

    //     if (data === null || data['me'] === null) {
    //       return false;
    //     } else {
    //       return data['me']['id'] > 0 ? true : false;
    //     }
    //   })
    // );

    /**
     * This is the 2nd type of query, use when a observable is needed/desired
     */
    // Query the current user to see if they are authenticated. If true, set
    // Authenticated to true and stop loading
    this.apollo
      .watchQuery<any>({
        query: getMe,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data, loading);
        // If no data or does not include me data, set authentiation to false
        if (data === null || data.me === null) {
          // Token is invalid, remove from local storage
          if (localStorage.getItem('breakoutToken') !== null) {
            console.log('Clearing invalid token');
            localStorage.setItem('breakoutToken', null);
          }
          this.userAuthenticated.next(false);
          this.loading.next(false);
        } else if (data.me.id > 0) {
          // If data includes a user id, it is authenticated
          this.userAuthenticated.next(true);
          this.loading.next(false);
          // this.userService.setUser(data.me);
          // if (!data.me.completedProfile) {
          //   this.router.navigate(['/createprofile']);
          // } else {
          //   // Return to home page
          //   this.router.navigate(['/']);
          // }
        } else {
          // If data id isn't included, set to false
          this.userAuthenticated.next(false);
          this.loading.next(false);
        }
      });
  }

  /**
   * Return an observable to watch if user is authenticated
   */
  public isAuthenticated(): Observable<boolean> {
    return this.userAuthenticated.asObservable();
  }
  /**
   * Return an observable to indicate if something is loading
   */
  public isLoaded(): Observable<boolean> {
    return this.loading.asObservable();
  }

  /**
   * Login user using graphql mutation
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public signIn(login: string, password: string): void {
    // Set loading to true
    this.loading.next(true);
    // Start mutation query
    this.apollo
      .mutate({
        mutation: signIn,
        variables: {
          username: login,
          password: password,
        },
      })
      .subscribe(
        ({ data }) => {
          // Set token to returned data value
          const token = data['signIn']['token'];
          // Store token to local storage
          localStorage.setItem('breakoutToken', token);
          // Refresh x-token header
          location.reload();
        },
        (error) => {
          // Stop loading
          this.loading.next(false);
          console.log('there was an error sending the query', error);
        }
      );
  }

  /**
   * Submit user for registration
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public registerUser(user: User): void {
    // Set loading to true
    this.loading.next(true);
    this.apollo
      .mutate({
        mutation: registerUser,
        variables: {
          username: user.username,
          password: user.password,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      })
      .subscribe(
        ({ data }) => {
          // Set token to returned data value
          const token = data['registerUser']['token'];
          // Store token to local storage
          localStorage.setItem('breakoutToken', token);
          // Set authentication to true
          this.userAuthenticated.next(true);
          // Stop loading animation
          this.loading.next(false);
          // Return to home page
          this.router.navigate(['/']);
        },
        (error) => {
          // Stop loading
          this.loading.next(false);
          console.log('there was an error sending the query', error);
        }
      );
  }

  /**
   * Log user out of application
   *
   */
  public logout(): void {
    // Set authentication to false
    this.userAuthenticated.next(false);
    // Clear user information from the application
    this.userService.clearUser();
    // Remove token from storage
    localStorage.setItem('breakoutToken', null);
    // this.apollo.client.resetStore();
    // Return to home page
    this.router.navigate(['/']);
    // Refresh x-token header
    location.reload();
  }
}