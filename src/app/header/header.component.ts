import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'HN Feeds';
  subtitle = 'We <3 hacker news!';

  constructor() { }

  ngOnInit() {
  }

}
