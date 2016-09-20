import { Component, Input } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

@Component({
  selector: 'post-upvoter',
  template: `
    <button (click)="upvote(postId)>
      Upvote
    </button>
  `
})
class PostUpvoterComponent {
  @Input() postId: number;

  constructor(private apollo: Angular2Apollo) {}

  upvote(postId: number) {
    this.apollo.mutate({
      mutation: gql`
        mutation upvotePost($postId: Int!) {
          upvotePost(postId: $postId) {
            id
            votes
          }
        }
      `,
      variables: {
        postId
      }
    });
  }

}
