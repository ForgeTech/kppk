import { Injectable } from '@angular/core';
import { InMemoryCache as ApolloInMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloQueryResult, ObservableQuery } from 'apollo-client';
import { persistCache, CachePersistor } from 'apollo-cache-persist';
import * as LocalForage from 'localforage';
import { RestLink } from 'apollo-link-rest';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { createHttpLink } from 'apollo-link-http';
import OfflineLink from 'apollo-link-offline';
import { ApolloLink } from 'apollo-link';
import { FgGraphqlServiceInterface } from './fg-graphql.service.interface';

/**
 * FgGraphqlClientService -
 * This service provides methodes to
 * create instances of forge graphql
 * client, based on apollo-graphql
 * ( https://www.apollographql.com/ )
 */
@Injectable()
export class FgGraphqlOfflineLinkService implements FgGraphqlServiceInterface {
  /**
   * Holds the created apollo-client instance
   */
  public _client: ApolloClient<{}>;
  /** Returns instance of apollo graphql-client if initialized, otherwise throws error */
  public get client(): ApolloClient<{}> {
    if (this._client) {
      return this._client;
    } else {
      throw new Error('ERROR - Apollo Graphql-Client needs to be initialized before use!');
    }
  }
  /**
   * Holds apollo-client cache-persist options
   */
  protected persistOptions: any;
  /**
   * Holds instance of apollo cache persistor
   * for controlling cache peristance behaviour
   */
  protected persistor: CachePersistor<any>;
  //  public fragmentConfigConnection = gql`
  // fragment connectionConfig on ConfigConnection
  // {
  //   id
  //   apiKey
  //   backupUrl
  //   serverUrl
  //   cache
  //   isProduction
  //   isValid
  // }`;
  // public fragmentConfigLogging = gql`
  // fragment loggingConfig on ConfigLogging {
  //   id
  //   logFolder
  //   logLevel
  //   cache
  //   isValid
  // }`;
  // public fragmentState = gql`
  //   fragment stateConfig on State {
  //   id
  //   allowed
  //   connection
  //   connectionState
  //   requestState
  // }`;
  // public fragmentBreakpoint = gql`
  //   fragment breakpointConfig on Breakpoint {
  //   id
  //   name
  //   cards {
  //     id
  //     cols
  //     id
  //     rows
  //     template
  //     title
  //   }
  //   grid {
  //     id
  //     cols
  //     gutterSize
  //     rowHeight
  //   }
  // }`;
  // public fragmentView = gql`
  //   fragment viewConfig on View {
  //   id name
  //   breakpoints {
  //     id name validFor
  //     cards { id cols rows template title }
  //     grid { id cols gutterSize rowHeight }
  //   }
  // }`;

  /**
   * CONSTRUCTOR
   */
  constructor() {}
  // /**
  //  * Methode returning a object for writing to apollo-cache by
  //  * unioning new and previous data
  //  */
  // protected getMutationWriteData(newData: any, prevData: any) {
  //   if ( !prevData ) {
  //     prevData = {};
  //   }
  //   if ( !newData ) {
  //     newData = {};
  //   }
  //   return Object.assign( prevData, newData );
  // }
  // /*
  // * Forward query to apollo-client instace query-methode
  // */
  // public query(query, variables: any = {}): Promise<ApolloQueryResult<{}>> {
  //   if ( this.apollo ) {
  //     return this.apollo.query({
  //       query: gql(query),
  //       variables: variables
  //     });
  //   } else {
  //     throw new Error( 'Apollo Client not intialized! Call createClient on fgGraphqlSevice before query! ' );
  //   }
  // }
  // /*
  // * Forward watchQuery to apollo-client instace watchQuery-methode
  // */
  // public watchQuery(query, variables: any = {}): ObservableQuery {
  //   if ( this.apollo ) {
  //     return this.apollo.watchQuery({
  //       query: gql(query),
  //       variables: variables
  //     });
  //   } else {
  //     throw new Error( 'Apollo Client not intialized! Call createClient on fgGraphqlSevice before watchQuery! ' );
  //   }
  // }
  // /*
  // * Forward mutations to apollo-client instace mutate-methode
  // */
  // public mutate( mutation, variables: any = {}): Promise<any> {
  //   if ( this.apollo ) {
  //     return this.apollo.mutate({
  //       mutation: gql(mutation),
  //       variables: variables
  //     });
  //   } else {
  //     throw new Error('Apollo Client not intialized! Call createClient on fgGraphqlSevice before mutate! ');
  //   }
  // }
  /**
   * Creates and returns an instance of
   * fg-graphql-client
   */
  public createClient(httpHeaders: string, data: any, resolvers: any, typeDefs: any): void {
    // Only create apollo-instance if it wasn't already
    // initialized
    if (this._client) {
      return;
    }
    const headers = new HttpHeaders();
    const AsyncStorage = LocalForage.createInstance(this.persistOptions);
    Object.values(httpHeaders).forEach(key => {
      headers.append(key, httpHeaders[key]);
    });
    // Initialize apollo InMemoryCache
    const cache = new ApolloInMemoryCache();
    // Setup persist-storage options and initialize it for apollo-client cache
    this.persistOptions = {};
    this.persistOptions.cache = cache;
    this.persistOptions.key = environment.name.concat('-apollo-cache');
    this.persistOptions.storage = AsyncStorage;
    persistCache(this.persistOptions);

    // Link is used to queue graphql-operations in case client is offline,
    // until the connection is becoming available again
    const offlineLink = new OfflineLink({
      storage: AsyncStorage,
    });
    // Create a RestLink for the REST API
    // If you are using multiple link types, restLink should go before httpLink,
    // as httpLink will swallow any calls that should be routed through rest!
    const restLink = new RestLink({
      uri: 'https://playground.powerbot-trading.com/api/v0/',
      headers: { api_key: '44fc8162-d2c6-432a-8279-d8d40e5c0e1b' },
    });
    const httpLink = createHttpLink({ uri: 'https://endfront.herokuapp.com/v1alpha1/graphql', headers: httpHeaders });
    // Initialize apollo-client instance
    let clientOptions: any = {};
    clientOptions.link = ApolloLink.from([offlineLink, restLink, httpLink]);
    clientOptions.cache = cache;
    // Initialize
    clientOptions.connectToDevTools = true; //environment.debug;
    clientOptions.resolvers = resolvers;
    clientOptions.typeDefs = typeDefs;
    clientOptions.data = data;
    // Read https://www.apollographql.com/docs/react/api/apollo-client/ for
    // further information on parameters
    clientOptions.defaultOptions = {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
        returnPartialData: true,
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    };

    this._client = new ApolloClient(clientOptions);
    this.persistor = new CachePersistor(this.persistOptions);
    offlineLink.setup(this.client);
  }
  /**
   * Return a instance of apollo cache-persistor for handling
   * apollo cache-persistation
   */
  getCachePersistor(): CachePersistor<any> | false {
    return this.persistor;
  }
}
