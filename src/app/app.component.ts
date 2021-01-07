import { Component, OnInit } from '@angular/core';
import { StopWtchService } from './stop-wtch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  seconds:string
  constructor(
    private stopWatch: StopWtchService
  ){}
  ngOnInit(): void {
    this.stopWatch.progress.subscribe(res=>{
      this.seconds = res;
      console.log(res)
    })
  }
  public start(event){
    this.stopWatch.startClick();
    
  }
  
  public reset(event){
    this.stopWatch.restartClick();
  }
  public wait(event){
    this.stopWatch.waitClick()
  }
  

}
