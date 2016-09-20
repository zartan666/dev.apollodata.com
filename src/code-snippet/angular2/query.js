import { Component, OnInit } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

@Component({
  selector: 'post-list',
  template: `
    <div *ngIf="loading">Loading</div>
    <ul *ngIf="!loading">
      <li *ngFor="let post of posts">
        {{post.title}} by 
        {{post.author.firstName}} {{post.author.lastName}}
        ({{post.votes}} votes)
      </li>
    </ul>
  `
})
class PostListComponent implements OnInit {
  loading: boolean;
  posts: any[];

  constructor(private apollo: Angular2Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
        query allPosts {
          posts {
            id
            title
            votes
            author {
              id
              firstName
              lastName
            }
          }
        }
      `
    }).subscribe(({ loading, data }) => {
      this.loading = loading;
      this.posts = data.posts;
    });
  }
}
