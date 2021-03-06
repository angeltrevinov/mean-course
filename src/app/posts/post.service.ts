import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router} from '@angular/router';
import {post} from 'selenium-webdriver/http';

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
            id: post._id,
            imagePath: post.imagePath
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
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(id: string, title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('id', id );
    postData.append('title', title );
    postData.append('content', content );
    postData.append('image', image, title );
    this.http.post<{ message: string, post: Post}>('http://localhost:3000/api/posts', postData).subscribe(
      (data) => {
        const post: Post = {
          id: data.post.id,
          title: data.post.title,
          content: data.post.content,
          imagePath: data.post.imagePath
        };
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

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('title', title );
      postData.append('content', content );
      postData.append('image', image, title );
    } else {
      postData = {
        id,
        title,
        content,
        imagePath: image
      };
    }


    this.http.put('http://localhost:3000/api/posts/' + id, postData).subscribe((res) => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex( p => p.id === id);
      const post: Post = {
        id,
        title,
        content,
        imagePath: null
      };
      updatedPost[oldPostIndex] = post;
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
}
