import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../post.model';
import {NgForm} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  private mode = 'create';
  private id: string;
  post: Post;
  isLoading = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.postService.getPost(this.id).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content };
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onAddPost(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postService.addPost('', form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.id, form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
