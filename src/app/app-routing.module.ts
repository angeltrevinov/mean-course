import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostsCreateComponent} from './posts/posts-create/posts-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostsCreateComponent },
  { path: 'edit/:id', component: PostsCreateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
