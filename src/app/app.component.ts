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
    
    const message = {
      someData: 'Hello from the parent app!',
    };

    iframeElement.contentWindow.postMessage(message, 'http://localhost:63441/upload');
  }

}
