import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  title = 'parentApp';

  sendMessageToIframe() {
    const iframeElement = this.elementRef.nativeElement.querySelector('iframe');
    
    const messageToChild = {
      "access_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NDAyNTUwLCJqdGkiOiI4YzAyMTg2Y2RhZjc0YjEwOWEwNDg1YWUyM2MwODk2ZSIsInVzZXJfaWQiOjU3M30.iqnxWaNT4nYEAg3b0dOTkvJW0q6hIYRv96yU7tkCJ0Y",
      "timetracker_userId": "573"
  };

    iframeElement.contentWindow.postMessage(messageToChild, 'https://bkt8h3jv-63441.inc1.devtunnels.ms/upload');
  }

}
