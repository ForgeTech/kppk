import { Injectable } from '@angular/core';
import { InMemoryCache as ApolloInMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';
import { HttpHeaders } from '@angular/common/http';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { CachePersistor } from 'apollo-cache-persist';
import { FgGraphqlServiceInterface } from './fg-graphql.service.interface';

/**
 * FgGraphqlClientServiceSSR -
 * This service provides methodes to
 * create instances of forge graphql
 * client, based on apollo-graphql
 * ( https://www.apollographql.com/ )
 * FOR SERVER-SIDE-RENDERING ENVIRONMENT.
 *
 * Compared with FgGraphqlClientService it lacks
 * implementations for persisting storage to client-storage
 * like LocalStorage ( only available in browser )
 */
@Injectable()
export class FgGraphqlServiceSSR implements FgGraphqlServiceInterface {
  /**
   * Holds the created apollo-client instance
   */
  protected _client: ApolloClient<{}>;
  /** Returns instance of apollo graphql-client if initialized, otherwise throws error */
  public get client(): ApolloClient<{}> {
    if (this._client) {
      return this._client;
    } else {
      throw new Error('ERROR - Apollo Graphql-Client needs to be initialized before use!');
    }
  }
  /**
   * CONSTRUCTOR
   */
  constructor() {}
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

    Object.values(httpHeaders).forEach(key => {
      headers.append(key, httpHeaders[key]);
    });
    // Initialize apollo InMemoryCache
    const cache = new ApolloInMemoryCache();

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
    clientOptions.link = ApolloLink.from([restLink, httpLink]);
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
  }
  /**
   * Return a instance of apollo cache-persistor for handling
   * apollo cache-persistation
   */
  public getCachePersistor(): CachePersistor<any> | false {
    return false;
  }
}
