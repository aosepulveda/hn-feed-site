import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedListComponent } from './feeds/feed-list/feed-list.component';

const routes: Routes = [
  { path: '', component: FeedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
