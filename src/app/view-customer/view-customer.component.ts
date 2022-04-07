import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from '../transfer.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  messageType = 0;
  errorMessage = "";
  showLightBox: boolean = false;
  userId: string = "";
  user: any = { name: "", email: "", currentBalance: "" };
  users: any[] = [];
  transferedByMe: any[] = [];
  transferedToMe: any[] = [];
  amount: any;
  routeSub: any;
  dbSub: any;
  transSub: any;

  transferMoney() {
    this.messageType = 0;
    let selectDD: any = document.getElementById("selectDropdown");

    if (this.amount <= 0 || this.amount == null) {
      this.errorMessage = "Transfer amount must be more than zero!!"
      this.messageType = 1;
    }
    else if (selectDD.value == "Select Email") {
      this.errorMessage = "Must select email to transfer to!!"
      this.messageType = 1;
    }
    else if ((this.user.currentBalance - this.amount) < 0) {
      this.errorMessage = "No enough money in your account to transfer this amount!!"
      this.messageType = 1;
    }
    else {
      let toUserId = selectDD.value;
      let fromUserId = this.userId;

      this._TransferService.addTransfer(fromUserId, toUserId, this.amount).subscribe((data) => {
        if (data.message == "Done") {

          let toUser = this.users.filter((value) => {
            return value._id == toUserId
          })

          let newFromUserBalance = (this.user.currentBalance - this.amount);
          let newToUserBalance = (toUser[0].currentBalance + this.amount);


          this._UserService.updateBalance(newFromUserBalance, fromUserId).subscribe();
          this._UserService.updateBalance(newToUserBalance, toUserId).subscribe();
          this.user.currentBalance = newFromUserBalance;
          this.transSub = this._TransferService.getUserTransfers(this.userId).subscribe((data) => {
            this.transferedByMe = data.transferedByYou;
          })

          this.messageType = 2;

          let successInterval = setInterval(() => {
            if (this.messageType == 2)
              this.messageType = 2;
          }, 50);

          setTimeout(() => {
            clearInterval(successInterval);
            if (this.messageType == 2)
              this.messageType = 0;
          }, 5000);
        }
        else {
          this.errorMessage = data.message;
          this.messageType = 1;
        }
      });
    }

  }

  setShowLightBox() {
    this.showLightBox = true;
    this.messageType = 0;
  }
  resetShowLightBox() {
    this.showLightBox = false;
  }

  constructor(private _ActivatedRoute: ActivatedRoute, private _UserService: UserService, private _TransferService: TransferService) {
    this.routeSub = this._ActivatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.dbSub = _UserService.getUser(this.userId).subscribe((data) => {
        this.user = data.user;

        this.users = data.users;
      })
      this.transSub = _TransferService.getUserTransfers(this.userId).subscribe((data) => {
        this.transferedByMe = data.transferedByYou;
        this.transferedToMe = data.transferedToYou;
      })

    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
    this.dbSub.unsubscribe()
    this.transSub.unsubscribe()
  }

}