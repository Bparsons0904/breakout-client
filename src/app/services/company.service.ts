import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MessagesService } from './messages.service';
import { Subscription } from 'rxjs';

/**
 * Mutation for creating company
 */
const createCompany = gql`
  mutation createCompany(
    $name: String!
    $description: String!
    $location: String!
    $website: String!
    $imageUrl: String!
    $active: Boolean!
  ) {
    createCompany(
      name: $name
      description: $description
      website: $website
      location: $location
      imageUrl: $imageUrl
      active: $active
    ) {
      id
      name
      description
      website
      location
      imageUrl
      active
    }
  }
`;

/**
 * Query for getting company
 */
const company = gql`
  query company($id: ID!) {
    company(id: $id) {
      id
      name
      description
      website
      location
      imageUrl
      active
    }
  }
`;

/**
 * Query for getting companies
 */
const getCompanies = gql`
  {
    companies {
      id
      name
      description
      website
      location
      imageUrl
      active
    }
  }
`;

/**
 * Mutation for approving companies
 */
const approveCompany = gql`
  mutation approveCompany($id: ID!) {
    approveCompany(id: $id) {
      id
      name
      description
      website
      location
      imageUrl
      active
    }
  }
`;

/**
 * Mutation for approving companies
 */
const removeCompany = gql`
  mutation removeCompany($id: ID!) {
    removeCompany(id: $id) {
      id
      name
      description
      website
      location
      imageUrl
      active
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company: BehaviorSubject<Company>;
  private companies: BehaviorSubject<[Company]>;
  private registerSuccess: BehaviorSubject<Boolean>;
  constructor(
    private apollo: Apollo,
    private messagesService: MessagesService
  ) {
    this.company = new BehaviorSubject<Company>(null);
    this.companies = new BehaviorSubject<[Company]>([null]);
    this.registerSuccess = new BehaviorSubject<Boolean>(null);

    this.apollo
      .watchQuery<any>({
        query: getCompanies,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.companies.next(data.companies);
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

  approveCompany(company: Company): void {
    this.messagesService.setInfoMessage(`Approving ${company.name}.`, 3000);
    this.apollo
      .mutate<any>({
        mutation: approveCompany,
        variables: {
          id: company.id,
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
            `${company.name} has been Approved.`,
            3000
          );
          this.companies.next(data.approveCompany);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          this.messagesService.setErrorMessage(
            `There was an error approving ${company.name}`
          );
          console.log('there was an error sending the query', error);
        }
      );
  }

  getCompany(id: string): Observable<Company> {
    this.apollo
      .watchQuery<any>({
        query: company,
        variables: {
          id: id,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        // this.loading = loading;
        // this.currentUser = data.currentUser;
        this.company.next(data.company);
        console.log(data.company);
      });
    return this.company.asObservable();
  }

  removeCompany(company: Company): void {
    console.log(company);
    this.messagesService.setInfoMessage(`Removing ${company.name}.`, 3000);
    this.apollo
      .mutate<any>({
        mutation: removeCompany,
        variables: {
          id: company.id,
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
            `${company.name} has been Removed.`,
            3000
          );
          console.log(data.removeCompany);

          this.companies.next(data.removeCompany);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          this.messagesService.setErrorMessage(
            `There was an error removing ${company.name}`
          );
          console.log('there was an error sending the query', error);
        }
      );
  }

  // queryCompanies(): void {
  //   console.log('Query companies started');

  //   this.apollo
  //     .watchQuery<any>({
  //       query: getCompanies,
  //     })
  //     .valueChanges.subscribe(({ data, loading }) => {
  //       console.log(data);

  //       // this.companies.next(data.companies);
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
  //       console.log('Query companies finished', this.companies);
  //     });
  // }

  registerCompany(company: Company): void {
    console.log('made it to service', company);
    this.messagesService.setInfoMessage(`Adding ${company.name}.`, 3000);
    // this.loading.next(true);
    this.apollo
      .mutate({
        mutation: createCompany,
        variables: {
          name: company.name,
          description: company.description,
          location: company.location,
          website: company.website,
          imageUrl: company.imageUrl,
          active: company.active,
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
            `${company.name} has been Added.`,
            3000
          );
          console.log(data);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          this.messagesService.setErrorMessage(
            `There was an error adding ${company.name}`
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

  getCompanies(): Observable<[Company]> {
    return this.companies.asObservable();
  }
}
