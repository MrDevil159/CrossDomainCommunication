import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private router:Router) {}
  title = 'parentApp';

  intervalSenderConfirm!:any;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.origin === 'https://bkt8h3jv-4200.inc1.devtunnels.ms') {
      // Handle the received message here
      console.log('Received message from iframe:', event.data);
      if(event.data.received===true) {
        clearInterval(this.intervalSenderConfirm)
      }
      if(event.data.received===false) {
        this.sendMessageToIframe();
      }
    }
  }
  


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

    // const iframeElement = this.elementRef.nativeElement.querySelector('iframe');
    const messageToChild = {
      timetracker_userId: P1Value,
      access_token: P2Value,
      Employee_ID: Employee_ID
    };


    // this.intervalSenderConfirm = setInterval(()=> {
    //   iframeElement.contentWindow.postMessage(
    //     messageToChild,
    //     'https://bkt8h3jv-4200.inc1.devtunnels.ms/upload'
    //   );
    // }, 1000);
    const url = "https://bkt8h3jv-4200.inc1.devtunnels.ms/employee";
    const newTab = window.open(url, '_blank');

    if (newTab) {
      // Wait for the new tab to fully load (optional)
      newTab.addEventListener('load', () => {
        // Send data to the new tab using postMessage
        setTimeout(() => {
          newTab.postMessage(messageToChild, 'https://bkt8h3jv-4200.inc1.devtunnels.ms/employee');
        }, 1000);
      });
    } else {
      // Handle the case where the popup blocker prevents opening a new tab
      // You can display an error message or redirect the user to the URL
      this.router.navigate(['/error']); // Redirect to an error page, if needed
    }
  }
}
