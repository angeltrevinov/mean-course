import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatToolbarModule} from '@angular/material';


import { AppComponent } from './components/app.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {PostService} from './posts/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
