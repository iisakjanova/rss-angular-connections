import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  Subscription,
  switchMap,
  takeWhile,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private seconds = 60;

  private countdownSubject = new BehaviorSubject<number>(this.seconds);

  countdown$: Observable<number> = this.countdownSubject.asObservable();

  private countdownSubscription: Subscription | undefined;

  private peopleCountdownSubject = new BehaviorSubject<number>(this.seconds);

  peopleCountdown$: Observable<number> =
    this.peopleCountdownSubject.asObservable();

  private peopleCountdownSubscription: Subscription | undefined;

  private groupDialogCountdownSubject = new BehaviorSubject<number>(
    this.seconds
  );

  groupDialogCountdown$: Observable<number> =
    this.groupDialogCountdownSubject.asObservable();

  private groupDialogCountdownSubscription: Subscription | undefined;

  startCountdown(): void {
    this.countdownSubscription = timer(0, 1000)
      .pipe(
        map(n => this.seconds - n - 1),
        takeWhile(n => n >= 0),
        switchMap(remainingSeconds => {
          this.countdownSubject.next(remainingSeconds);
          return remainingSeconds === 0 ? [] : [remainingSeconds];
        })
      )
      .subscribe();
  }

  resetCountdown(): void {
    this.countdownSubject.next(0);
  }

  stopCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdownSubscription = undefined;
    }
  }

  startPeopleCountdown(): void {
    this.peopleCountdownSubscription = timer(0, 1000)
      .pipe(
        map(n => this.seconds - n - 1),
        takeWhile(n => n >= 0),
        switchMap(remainingSeconds => {
          this.peopleCountdownSubject.next(remainingSeconds);
          return remainingSeconds === 0 ? [] : [remainingSeconds];
        })
      )
      .subscribe();
  }

  resetPeopleCountdown(): void {
    this.peopleCountdownSubject.next(0);
  }

  stopPeopleCountdown(): void {
    if (this.peopleCountdownSubscription) {
      this.peopleCountdownSubscription.unsubscribe();
      this.peopleCountdownSubscription = undefined;
    }
  }

  startGroupDialogCountdown(): void {
    this.groupDialogCountdownSubscription = timer(0, 1000)
      .pipe(
        map(n => this.seconds - n - 1),
        takeWhile(n => n >= 0),
        switchMap(remainingSeconds => {
          this.groupDialogCountdownSubject.next(remainingSeconds);
          return remainingSeconds === 0 ? [] : [remainingSeconds];
        })
      )
      .subscribe();
  }

  resetGroupDialogCountdown(): void {
    this.groupDialogCountdownSubject.next(0);
  }

  stopGroupDialogCountdown(): void {
    if (this.groupDialogCountdownSubscription) {
      this.groupDialogCountdownSubscription.unsubscribe();
      this.groupDialogCountdownSubscription = undefined;
    }
  }
}
