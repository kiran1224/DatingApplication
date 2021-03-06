import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  TabsModule } from 'ngx-bootstrap/tabs';
import {  TimeagoModule } from 'ngx-timeago';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
// import { PreventUnsavedChanges } from './_guards/';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http' ;
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
// import { NgxGalleryModule } from 'ngx-gallery';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

export function tokenGetter() {
   return localStorage.getItem('token');
 }

export class CustomHammerConfig extends HammerGestureConfig  {
overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
 }

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      JwtModule.forRoot
      ({
         config: {
           tokenGetter: tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth'],
         },
       }),
       TabsModule.forRoot(),
       BsDatepickerModule.forRoot(),
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      ReactiveFormsModule,
      TimeagoModule.forRoot(),
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      UserService,
      AuthGuard,
      MemberDetailResolver,
      MemberListResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
      MemberEditResolver,
      PreventUnsavedChanges,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
