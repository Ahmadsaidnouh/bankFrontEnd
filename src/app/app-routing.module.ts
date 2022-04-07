import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"viewAllCustomers", component:ViewAllCustomersComponent},
  {path:"viewAllCustomers/viewCustomer/:userId", component:ViewCustomerComponent},
  {path:"**", component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
