import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as io from 'socket.io-client';
import * as moment from 'moment';
import { Message } from '../models/message.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

export const socket = io('http://localhost:3000/');
// export const socket = io('https://mangapotichat.herokuapp.com');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message = '';
  messages: Array<Message> = [];
  sendLocationDisabled = false;
  name: string;
  room: string;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // route params retrieve

    this.route.queryParams.subscribe(params => {
      this.name = params.name;
      this.room = params.room;
    });
    console.log(this.name, this.room);
    // socket connection
    socket.on('connect', () => {
      console.log(`server is connected`);
      const params = {
        name: this.name,
        room: this.room
      };

      socket.emit('join', params, err => {
        if (err) {
          alert('Please provide valid room and name');
          this.router.navigateByUrl('/');
        } else {
          console.log('no err');
        }
      });
    });
    socket.on('disconnect', () => console.log(`server is disconnected`));

    socket.on('newMessage', (msg: Message) => {
      msg.createdAt = moment(msg.createdAt).format('h:mm a');
      this.messages.push(msg);
      this.changeDetection.detectChanges();
    });

    socket.on('newLocationMessage', (msg: Message) => {
      msg.createdAt = moment(msg.createdAt).format('h:mm a');
      this.messages.push(msg);
      this.changeDetection.detectChanges();
    });
  }

  submit() {
    socket.emit(
      'createMessage',
      {
        from: this.name,
        text: this.message
      },
      data => {
        this.message = '';
      }
    );
  }

  sendLocation() {
    if (!navigator.geolocation) {
      return alert('geolocation is not supported');
    }
    this.sendLocationDisabled = true;
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        this.sendLocationDisabled = false;
        socket.emit('createGeoLocation', {
          name: this.name,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (positionError: PositionError) => {
        alert(positionError.message);
        this.sendLocationDisabled = false;
      }
    );
  }
}
