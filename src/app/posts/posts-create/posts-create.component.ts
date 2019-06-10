import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../post.model';
import {NgForm} from '@angular/forms';
import {PostService} from '../post.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {

    if (form.valid) {
      this.postService.addPost(form.value.title, form.value.content);
    }
  }

}
