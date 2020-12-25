import { Component } from '@angular/core';
import { AppService } from './app.service';
const rabbitMQ= {
status: '',
topic:{
  message: '',
  id: ''
}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rabbitMQ:any = rabbitMQ;
  startResponse:any = "";
  stopResponse:any = "";
  response:any = "";
  rabbitMQStopped = true;

  constructor(private appService : AppService){

  }

  isStatusAvailable(){
    return this.rabbitMQ.status!=="";
  }
  
  isRabbitMQStopped(){
    return this.rabbitMQStopped;
  }

  QueueAction(action){
    if(action){
      this.appService.startQueue().subscribe((response) => {
        this.response = response['message'];
        this.rabbitMQStopped= false;
      })
    }else{
      this.appService.stopQueue().subscribe((response) => {
        this.response = response['message'];
        this.rabbitMQStopped = true;
      });
    }
  }

  getStatus(){
    this.appService.getStatus().subscribe((response) => {
      this.rabbitMQ = JSON.parse(JSON.stringify(response));
    })
  }

}
