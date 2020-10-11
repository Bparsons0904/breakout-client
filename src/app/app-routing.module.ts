import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/modules/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CompanyHomeComponent } from './components/pages/company-home/company-home.component';
import { RoomHomeComponent } from './components/pages/room-home/room-home.component';
import { CompanyDetailComponent } from './components/pages/company-detail/company-detail.component';
import { RoomDetailComponent } from './components/pages/room-detail/room-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'company', component: CompanyHomeComponent },
  { path: 'company/details/:id', component: CompanyDetailComponent },
  { path: 'room', component: RoomHomeComponent },
  { path: 'room/details/:id', component: RoomDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
