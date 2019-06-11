import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../post.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {mimeType} from './mime-type.validator';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  private mode = 'create';
  private id: string;
  form: FormGroup;
  post: Post;
  isLoading = false;
  myImagePreview: string | ArrayBuffer;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null,
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ]
        }),
      content: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      images: new FormControl( null, {
        validators: [
          Validators.required
        ],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.postService.getPost(this.id).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            images: this.post.imagePath
          });

          this.myImagePreview = this.form.get('images').value;

        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onAddPost() {

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost('', this.form.value.title, this.form.value.content, this.form.value.images);
    } else {
      this.postService.updatePost(this.id, this.form.value.title, this.form.value.content, this.form.value.images);
    }
    this.form.reset();
  }

  onImagePick(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ images: file});
    this.form.get('images').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.myImagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

}
