import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {WatchingComponent}from './components/watching/watching.component';
import {DangkiComponent}from './components/dangki/dangki.component';
import {FavoritesComponent}from './components/favorites/favorites.component';
import {GenreAdminnComponent}from './components/genre-adminn/genre-adminn.component';
import {MovieAdminComponent}from './components/movie-admin/movie-admin.component';
import {EpisodeAdminComponent}from './components/episode-admin/episode-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Định tuyến mặc định
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie-detail', component: MovieDetailComponent }, 
  { path: 'watching', component: WatchingComponent }, 
  { path: 'signup', component: DangkiComponent }, 
  { path: 'favorites/:username', component: FavoritesComponent }, 
  { path: 'homeAdmin', component: GenreAdminnComponent }, 
  { path: 'movieAdmin', component:  MovieAdminComponent}, 
  { path: 'episode', component:  EpisodeAdminComponent}, 


  // Bạn có thể thêm các tuyến đường khác ở đây
];

export const appRouters = RouterModule.forRoot(routes);
