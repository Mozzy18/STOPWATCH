import { Injectable } from '@angular/core';
import { interval, Observable, PartialObserver, Subject } from 'rxjs';
import { takeUntil, buffer, filter, throttleTime, debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopWtchService {
  constructor() { } 

  private progressNum = 0;
  progress = new Subject<string>();
  isRunning = true;
  isComplete = true;
  letsGo = false;
  afterWait = false;
  afterReset = true;
 
 

  timeString:string = "00:00:00"

  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;

  stopClick$ = new Subject();
  pauseClick$ = new Subject();
  waitClick$ = new Subject();

  private getProgress() {
    this.progress.next( this.timeString )
  }

  public startClick() {
      this.letsGo = !this.letsGo
      if(this.afterWait && this.afterReset){
        this.isComplete = false
        this.letsGo = true;
        this.afterWait = false;
      }
    if(this.letsGo){ this.getProgress();
      this.isRunning = true;
  
      this.timer$ = interval(1000)
        .pipe(
          takeUntil(this.stopClick$),
          takeUntil(this.waitClick$)
      );
  
      this.timerObserver = {
        next: (_: number) => {
          if(!this.isRunning )
          return
  
          this.progressNum ++;
          this.timeString =  Math.floor(this.progressNum / 3600) + ":" + Math.floor((this.progressNum / 60) ) + ":" + (this.progressNum % 60) ;
          
          this.getProgress()
          
        }
      };
  
      this.timer$.subscribe(this.timerObserver);
      }

      else{this.stopClick()}

    
  }



  restartClick() {
    this.afterReset = true;
    this.letsGo = false;
    this.isRunning = true; 
    this.progressNum = 0;
    if (this.isComplete) {
      this.isComplete = false;
     
      this.getProgress();
    }

    this.timer$.subscribe(this.timerObserver);
  }

  stopClick() {
    this.progressNum = 0;
    this.getProgress();
    this.stopClick$.next();
    this.isRunning = false;
    this.timeString = "00:00:00";
    return this.progressNum
  }

  waitClick() {
    const mouse$ = fromEvent(document, 'click');
    const buff$ = mouse$.pipe(debounceTime(300))
    const click$ = mouse$.pipe(
      buffer(buff$),
      map(x =>{return x.length}),
      filter(x => x===2)
    )
    click$.subscribe(() => {
    this.letsGo = true;
    this.getProgress();
    this.waitClick$.next();
    this.isRunning = false;
    this.afterWait = true;
    
    
      return this.progressNum
    })
    
    
    
  }

}
