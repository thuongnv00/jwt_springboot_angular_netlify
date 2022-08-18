import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './component/form-auth/register/register.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { LoginComponent } from './component/form-auth/login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment.prod";
import { UploadAvatarComponent } from './upload/upload-avatar/upload-avatar.component';
import { UploadFileComponent } from './upload/upload-file/upload-file.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { CreateSongComponent } from './component/song/create-song/create-song.component';
import { interceptorProviders} from "./service/auth/auth.interceptor";
import {AuthGuard} from "./service/auth/auth.guard";
import { GettingstartedComponent } from './component/page/gettingstarted/gettingstarted.component';
import { HomeComponent } from './component/page/home/home.component';
import { HeaderComponent } from './component/page/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { PageSongComponent } from './component/song/page-song/page-song.component';
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  {path:'register',component: RegisterComponent,data:{title:"Register"}},
  {path:'login',component: LoginComponent ,data:{title: "Login"}},
  {path:'create-song',component: CreateSongComponent,canActivate:[AuthGuard], data:{title: "CreateSong"}},
  {path:'header',component: HeaderComponent, data:{title: "Header"}},
  {path:'page-song',component: PageSongComponent, data:{title: "page-song"}},
  ]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UploadAvatarComponent,
    UploadFileComponent,
    CreateSongComponent,
    GettingstartedComponent,
    HomeComponent,
    HeaderComponent,
    PageSongComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: false}),
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
