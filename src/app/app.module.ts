import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './components/app.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
