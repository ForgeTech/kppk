import ApolloClient from 'apollo-client';
import { CachePersistor } from 'apollo-cache-persist';

export interface FgGraphqlServiceInterface {
  readonly client: ApolloClient<{}>;
  createClient(httpHeaders: string, data: any, resolvers: any, typeDefs: any): void;
  getCachePersistor(): CachePersistor<any> | false;
}
