import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  title = 'parentApp';
  saveInLocalStorage() {
    const data = {
      P1: '573',
      P2: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NDAyNTUwLCJqdGkiOiI4YzAyMTg2Y2RhZjc0YjEwOWEwNDg1YWUyM2MwODk2ZSIsInVzZXJfaWQiOjU3M30.iqnxWaNT4nYEAg3b0dOTkvJW0q6hIYRv96yU7tkCJ0Y',
      Employee_ID: "PW372"
    };
    localStorage.setItem('P1', data.P1);
    localStorage.setItem('P2', data.P2);
    localStorage.setItem('Employee_ID', data.Employee_ID);

  }


  sendMessageToIframe() {
    this.saveInLocalStorage();
    let P1Value;
    if (localStorage.getItem('P1')) {
      P1Value = localStorage.getItem('P1');
      console.log('P1:', P1Value);
    } else {
      console.log('P1 does not exist in local storage to Send, Sending Undefined');
    }
    let P2Value;
    if (localStorage.getItem('P1')) {
      P2Value = localStorage.getItem('P2');
      console.log('P2:', P2Value);
    } else {
      console.log('P2 does not exist in local storage to Send, Sending Undefined');
    }
    let Employee_ID;
    if (localStorage.getItem('Employee_ID')) {
      Employee_ID = localStorage.getItem('Employee_ID');
      console.log('Employee_ID:', Employee_ID);
    } else {
      console.log('Employee_ID does not exist in local storage to Send, Sending Undefined');
    }

    const iframeElement = this.elementRef.nativeElement.querySelector('iframe');
    const messageToChild = {
      timetracker_userId: P1Value,
      access_token: P2Value,
      Employee_ID: Employee_ID
    };

    iframeElement.contentWindow.postMessage(
      messageToChild,
      'https://bkt8h3jv-63441.inc1.devtunnels.ms/upload'
    );
  }
}
