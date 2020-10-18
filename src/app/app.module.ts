import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpLinkModule } from 'apollo-angular-link-http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';
import { MessagesService } from './services/messages.service';

import { NavbarComponent } from './components/modules/navbar/navbar.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './components/modules/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoadingComponent } from './components/modules/loading/loading.component';
import { MessagesComponent } from './components/modules/messages/messages.component';
import { CompanyCreateComponent } from './components/modules/company-create/company-create.component';
import { CompanyListComponent } from './components/modules/company-list/company-list.component';
import { CompanyHomeComponent } from './components/pages/company-home/company-home.component';
import { CompanyApproveComponent } from './components/modules/company-approve/company-approve.component';
import { MiniLoaderComponent } from './components/modules/mini-loader/mini-loader.component';
import { RoomHomeComponent } from './components/pages/room-home/room-home.component';
import { RoomCreateComponent } from './components/modules/room-create/room-create.component';
import { RoomApproveComponent } from './components/modules/room-approve/room-approve.component';
import { RoomListComponent } from './components/modules/room-list/room-list.component';
import { CompanyDetailComponent } from './components/pages/company-detail/company-detail.component';
import { RoomDetailComponent } from './components/pages/room-detail/room-detail.component';
import { RoomCompleteComponent } from './components/modules/room-complete/room-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    MessagesComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyHomeComponent,
    CompanyApproveComponent,
    MiniLoaderComponent,
    RoomHomeComponent,
    RoomCreateComponent,
    RoomApproveComponent,
    RoomListComponent,
    CompanyDetailComponent,
    RoomDetailComponent,
    RoomCompleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    HttpLinkModule,
  ],
  providers: [AuthService, UserService, MessagesService, CompanyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
