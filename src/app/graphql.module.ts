import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from 'src/environments/environment';
// import { ApolloLink } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import {AuthService} from 'src/app/auth/auth-provider.service';
// import {ApolloLink} from 'apollo-link';
import { setContext } from 'apollo-link-context';
import {ApolloLink} from 'apollo-link';


const uri = environment.graphql_url; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, authService: AuthService) {
  const http = httpLink.create({ uri });

  const authMiddleware = setContext(async () => {
    let token: string;

    if (authService.isAuthenticated) {
      const client = await authService.getAuth0Client();
      token = await client.getTokenSilently();
    }

    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  });

  const link = ApolloLink.from([
    authMiddleware,
    http
  ]);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {}
