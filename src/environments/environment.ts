// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0_url: 'dev-m236ic1u.eu.auth0.com',
  auth0_audience: 'test-api',
  auth0_id: '82W4viw3kZa1YbHpaY3dq99m6cHAxGhc',
  graphql_url: 'http://localhost:3001/graphql',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
