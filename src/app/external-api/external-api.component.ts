import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const query = gql`
  {
    users {
      firstName
      lastName
    }
  }
`;

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.scss']
})
export class ExternalApiComponent implements OnInit {
  responseJson: string;
  hasResponse = false;
  users: any;

  private querySubscription: Subscription;

  constructor(private apiService: ApiService, private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.users = data.users;
      });
  }

  async pingApi() {
    const response = await this.apiService.ping();

    this.responseJson = JSON.stringify(response, null, 2).trim();
    this.hasResponse = true;
  }
}
