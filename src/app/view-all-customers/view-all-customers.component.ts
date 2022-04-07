import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrls: ['./view-all-customers.component.css']
})
export class ViewAllCustomersComponent implements OnInit {

  users: any[] = []
  subscription: any;

  constructor(private _UserService: UserService) {
    this.subscription = _UserService.getAllUsers().subscribe((data) => { this.users = data.users })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
