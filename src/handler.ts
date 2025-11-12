import type { GraphQLContext } from './types';
import './config/env';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  introspection: true
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async ({ event }): Promise<GraphQLContext> => ({
      requestId: event.requestContext.requestId ?? 'offline-request'
    })
  }
);
