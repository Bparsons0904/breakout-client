import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private errorMessage: BehaviorSubject<string>;
  private infoMessage: BehaviorSubject<string>;
  private loadingBig: BehaviorSubject<boolean>;
  private loadingSmall: BehaviorSubject<boolean>;

  constructor() {
    this.errorMessage = new BehaviorSubject<string>('');
    this.infoMessage = new BehaviorSubject<string>('');
    this.loadingBig = new BehaviorSubject<boolean>(true);
    this.loadingSmall = new BehaviorSubject<boolean>(false);
  }

  public getErrorMessage(): Observable<string> {
    return this.errorMessage.asObservable();
  }
  public setErrorMessage(errorMessage: string): void {
    this.errorMessage.next(errorMessage);
    setTimeout(() => {
      this.clearErrorMessage();
    }, 5000);
  }
  public clearErrorMessage(): void {
    this.errorMessage.next('');
  }
  public getInfoMessage(): Observable<string> {
    return this.infoMessage.asObservable();
  }

  public setInfoMessage(infoMessage: string, delay: number = 5000): void {
    console.log(infoMessage);

    this.infoMessage.next(infoMessage);
    setTimeout(() => {
      this.clearInfoMessage();
    }, delay);
  }
  public clearInfoMessage(): void {
    this.infoMessage.next('');
  }
  /**
   * Return an observable to indicate if something is loading
   */
  public isLoadedBig(): Observable<boolean> {
    return this.loadingBig.asObservable();
  }

  public setLoadingBig(loading: boolean): void {
    this.loadingBig.next(loading);
  }
  /**
   * Return an observable to indicate if something is loading
   */
  public isLoadedSmall(): Observable<boolean> {
    console.log('Observable out');

    return this.loadingSmall.asObservable();
  }

  public setLoadingSmall(loading: boolean): void {
    this.loadingSmall.next(loading);
    console.log(loading);
  }
}
