import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  name = '';
  room = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  join() {
    this.router.navigate(['/chat'], {queryParams: {
      name: this.name,
      room: this.room
    }});
  }

}
