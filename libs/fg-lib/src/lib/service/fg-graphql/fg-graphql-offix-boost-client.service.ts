// import { Injectable } from '@angular/core';
// import { createClient, ApolloOfflineClient } from 'offix-client-boost';
// import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
// import { NGXLogger } from 'ngx-logger';
// import gql from 'graphql-tag';
// import { Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FgGraphqlOffixBoostClientService {
//   /** Hold the protected instance of the apollo-boost-client */
//   protected CLIENT: ApolloOfflineClient;
//   protected CLIENT$: Subject<ApolloOfflineClient> = new Subject();
//   get client$(): Observable<ApolloOfflineClient> {
//     return this.CLIENT$.asObservable();
//   }
//   /** CONSTRUCTOR */
//   constructor(
//     /** Provides angular-environemt-variables */
//     public $env: FgEnvironmentService,
//     /** Provides logging-service */
//     public $log: NGXLogger
//   ) {
//       if ( this.$env.graphql ) {
//         const config = {
//           // name: '',
//           // version: '',
//           httpUrl: this.$env.graphql.httpUrl,
//           wsUrl: this.$env.graphql.wsUrl,
//           connectToDevTools: true,
//           queryDeduplication: false,
//           // ssrMode: false,
//           // ssrForceFetchDelay: 2000,
//           // authContextProvider:
//           fileUpload: true,
//         };
//         createClient( config ).then( ( client: ApolloOfflineClient ) => {
//           this.CLIENT = client;
//           this.CLIENT.query({
//             query: gql`
//               query color( $limit: Int!, $offset: Int, $order_by: [color_order_by!] ) {
//                 color( limit: $limit, offset: $offset, order_by: $order_by) {
//                   id
//                   name
//                   value
//                   colorFormatByColorFormatId {
//                     name
//                   }
//                   colorGroup_id
//                 }
//               }
//             `,
//             variables: {
//               limit: 50,
//               offset: 0,
//               order_by: [{ name: 'desc' }] ,
//             }
//           }).then( result => console.table( result ) );
//         } );
//       } else {
//         this.$log.error(
//           `Application uses FgGraphqlService, but doesn't provide required
//           configuration via angular-environment-variables. Implement ApolloConfigInterface
//           on field graphql in angular-environemt file.`
//         );
//       }
//   }
// }
