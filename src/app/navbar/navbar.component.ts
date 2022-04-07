import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navNumber: number = 1;
  isNavClosed: boolean = true;
  navColored: boolean = false;

  changeNavNumber(num: number): void {
    this.navNumber = num;
  }
  changeIsNavClosed(): void {
    this.isNavClosed = !this.isNavClosed;
  }

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("document:scroll")
  scrollFunction() {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
      this.navColored = true;
    }
    else {
      this.navColored = false;
    }
  }

}
