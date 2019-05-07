import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';

export const socket = io('http://localhost:3000/');
// export const socket = io('https://mangapotichat.herokuapp.com');

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    constructor(private router: Router) { }

  connectToSocket(name, room) {
    socket.on('connect', () => {
      console.log(`server is connected`);
      const params = {
        name,
        room
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
  }
}
