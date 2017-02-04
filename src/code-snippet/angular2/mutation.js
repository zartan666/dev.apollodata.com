import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
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

  constructor(private apollo: Apollo) {}

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
