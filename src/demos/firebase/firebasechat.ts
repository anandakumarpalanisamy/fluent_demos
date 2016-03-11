import {Component} from 'angular2/core'
import {AngularFire, defaultFirebase, FIREBASE_PROVIDERS, FirebaseListObservable} from 'angularfire2'


@Component({
  selector: 'firebase-demo',
  template: `
    <h2>firebase demo</h2>
    <input type="text" #newmessage />
    <button (click)="addMessage(newmessage)">send</button>
    <ul>
      <li *ngFor="#message of messages | async">{{ message.text }}</li>
    </ul>
  `,
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://fluent-chat-demo.firebaseio.com/')
  ]
})
export class FirebaseChat {
  messages: FirebaseListObservable<any[]>
  constructor(angularFire: AngularFire){
    this.messages = angularFire.list('/messages');
  }
  addMessage(el){
   
    let newMessage = {text: el.value};
    this.messages.add(newMessage);
    el.value = '';
  }
}
