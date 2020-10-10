import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../models/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';
import { MessagesService } from './messages.service';

/**
 * Query for getting current user
 */
const getMe = gql`
  {
    me {
      id
      username
      email
      role
      wishlist {
        id
      }
      completedRooms {
        id
      }
      favorites {
        id
      }
      successfulRooms
      failedRooms
    }
  }
`;
/**
 * Mutation for registering user
 */
const signUp = gql`
  mutation signUp($username: String!, $password: String!, $email: String!) {
    signUp(username: $username, email: $email, password: $password) {
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
  private admin: BehaviorSubject<boolean>;
  // private user: User;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private userService: UserService,
    private messagesService: MessagesService
  ) {
    // Initialize the observable variables with default values
    this.userAuthenticated = new BehaviorSubject<boolean>(false);
    this.admin = new BehaviorSubject<boolean>(false);
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
          this.messagesService.setLoadingBig(false);
        } else if (data.me.id != null) {
          // If data includes a user id, it is authenticated
          this.userAuthenticated.next(true);
          this.messagesService.setLoadingBig(false);
          this.userService.setUser(data.me);
          if (data.me.role == 'admin') {
            this.admin.next(true);
          }
          // if (!data.me.completedProfile) {
          //   this.router.navigate(['/createprofile']);
          // } else {
          //   // Return to home page
          //   this.router.navigate(['/']);
          // }
        } else {
          // If data id isn't included, set to false
          this.userAuthenticated.next(false);
          this.messagesService.setLoadingBig(false);
          console.log("Getme issue");
          
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
   * Return an observable to watch if user is authenticated
   */
  public isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }

  /**
   * Login user using graphql mutation
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public signIn(login: string, password: string): void {
    this.messagesService.clearErrorMessage();
    // Set loading to true
    this.messagesService.setLoadingBig(true);
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
          // Return to home page
          this.router.navigate(['/']).then(() => {
            // Refresh x-token header
            location.reload();
          });
        },
        (error) => {
          // Stop loading
          this.messagesService.setLoadingBig(false);
          this.messagesService.setErrorMessage(error);
        }
      );
  }

  /**
   * Submit user for registration
   *
   * @param login User selected username or email
   * @param password User inputted password
   */
  public signUp(user: User): void {
    // Set loading to true
    this.messagesService.setLoadingBig(true);
    this.apollo
      .mutate<any>({
        mutation: signUp,
        variables: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
      })
      .subscribe(
        ({ data }) => {
          // Set token to returned data value
          const token = data.signUp.token;
          // Store token to local storage
          localStorage.setItem('breakoutToken', token);
          // Set authentication to true
          this.userAuthenticated.next(true);
          // Stop loading animation
          this.messagesService.setLoadingBig(false);
          // Return to home page
          this.router.navigate(['/']).then(() => location.reload());
        },
        (error) => {
          // Stop loading
          this.messagesService.setLoadingBig(false);
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
