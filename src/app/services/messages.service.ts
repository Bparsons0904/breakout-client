import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private errorMessage: BehaviorSubject<string>;
  private infoMessage: BehaviorSubject<string>;
  private loading: BehaviorSubject<boolean>;
  constructor() {
    this.errorMessage = new BehaviorSubject<string>('');
    this.infoMessage = new BehaviorSubject<string>('');
    this.loading = new BehaviorSubject<boolean>(true);
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
  public setInfoMessage(infoMessage: string): void {
    this.infoMessage.next(infoMessage);
    setTimeout(() => {
      this.clearInfoMessage();
    }, 5000);
  }
  public clearInfoMessage(): void {
    this.infoMessage.next('');
  }
  /**
   * Return an observable to indicate if something is loading
   */
  public isLoaded(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public setLoading(loading: boolean): void {
    this.loading.next(loading);
  }
}
