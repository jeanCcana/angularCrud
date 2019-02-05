import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appName = "MonoApp 🍌"

  constructor() { }

  ngOnInit() {
  }

  public close() {
    $('.navbar-collapse').collapse('hide');
  }
}
