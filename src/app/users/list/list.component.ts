import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

const query = gql`{
  users {
    firstName
    lastName
  }
}`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: [];
  subscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.subscription = this.apollo
      .query({ query })
      .subscribe(result => (this.users = result.data.users));
  }
}
