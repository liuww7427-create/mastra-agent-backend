import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import './config/env';
import type { GraphQLContext } from './types';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function bootstrap() {
  const port = Number(process.env.PORT) || 3000;
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: true
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => ({
      requestId: req.headers['x-request-id']?.toString() ?? 'local-request'
    })
  });

  console.log(`👶 Baby Care GraphQL server ready at ${url}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start local GraphQL server', error);
  process.exit(1);
});
