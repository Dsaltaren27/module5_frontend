import { Routes } from '@angular/router';
import { ShortenerComponent } from './components/shortener/shortener.component';
import { RedirectionComponent} from './components/redirection/redirection.component';

export const routes: Routes = [
  { path: '', component: ShortenerComponent },
  { path: 'short/:codigo', component: RedirectionComponent },
  { path: '**', redirectTo: '' }
];