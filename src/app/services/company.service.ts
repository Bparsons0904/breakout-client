import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
      company {
        id
      }
    }
  }
`;

/**
 * Query for getting companies
 */
const getCompanies = gql`
  {
    companies {
      name
      description
      website
      location
      imageUrl
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companies: BehaviorSubject<[Company]>;

  constructor(private apollo: Apollo) {
    this.companies = new BehaviorSubject<[Company]>([null]);
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

  register(company: Company): void {
    console.log('made it to service', company);
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
          console.log(data);
        },
        (error) => {
          // Stop loading
          // this.loading.next(false);
          console.log('there was an error sending the query', error);
        }
      );
  }

  getCompanies(): Observable<[Company]> {
    return this.companies.asObservable();
  }
}
