import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

const query = gql`
  {
    users {
      id
      firstName
      lastName
      blocked
    }
  }
`;

const blockUserMutation = gql`
  mutation blockUserMutation($id: String!, $block: Boolean!) {
    users {
      update(id: $id, input: { blocked: $block }) {
        id
        blocked
      }
    }
  }
`;

interface Response {
  users: [];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  users: [];
  subscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.subscription = this.apollo
      .watchQuery<Response>({ query })
      .valueChanges.subscribe(result => (this.users = result.data.users));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  block(id: string, block: boolean) {
    console.log(id, block);
    this.apollo
      .mutate({
        mutation: blockUserMutation,
        variables: {
          block,
          id
        }
      })
      .toPromise()
      .then(console.log)
      .catch(console.log);
  }
}
