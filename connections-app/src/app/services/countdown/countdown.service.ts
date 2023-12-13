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
}
