import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostsUpdateListener().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

}
