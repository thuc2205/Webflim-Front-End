import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { SecssionComponent } from './components/secssion/secssion.component';
import { FooterComponent } from './components/headers/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FootersComponent } from './components/footers/footers.component';
import { WatchingComponent } from './components/watching/watching.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './intorcepter/token.intercepter';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { DangkiComponent } from './components/dangki/dangki.component';
import { AppComponent } from './app.component';
import { appRouters } from './app.router';
import { UserProfileModalComponent } from './components/user-profile-modal/user-profile-modal.component';
import {FavoritesComponent} from './components/favorites/favorites.component'
import {ThucbaflimComponent} from './components/admin/thucbaflim.component';
import {GenreAdminnComponent}from './components/genre-adminn/genre-adminn.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MovieAdminComponent}from './components/movie-admin/movie-admin.component';
import {EpisodeAdminComponent}from './components/episode-admin/episode-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    DangkiComponent,
    WatchingComponent,
    HomeComponent,
    FooterComponent,
    FootersComponent,
    SecssionComponent,
    LoginComponent,
    MovieDetailComponent,
    UserProfileModalComponent,
    FavoritesComponent,
    ThucbaflimComponent,
    GenreAdminnComponent,
    MovieAdminComponent,
    EpisodeAdminComponent
  ],
  imports: [    NgbModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    appRouters,
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
