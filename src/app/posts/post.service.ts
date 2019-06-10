import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router} from '@angular/router';

@Injectable()
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts').
    pipe(
      map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      })).subscribe(
      (transformPosts) => {
        this.posts = transformPosts;
        this.postsUpdated.next([...this.posts]);
      }
    );
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(id: string, title: string, content: string) {
    const post: Post = { id, title, content};
    this.http.post<{ message: string, id: string}>('http://localhost:3000/api/posts', post).subscribe(
      (data) => {
        console.log(data.message);
        post.id = data.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      }
    );
  }

  deletePost(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(
      (res) => {
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id,
      title,
      content
    };
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe((res) => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex( p => p.id === post.id);
      updatedPost[oldPostIndex] = post;
      this.post = updatedPost;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
}
