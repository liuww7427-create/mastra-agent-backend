import type { ExecutionContext } from '@cloudflare/workers-types';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { setRuntimeEnv } from './config/env';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  maskedErrors: false,
  context: ({ request }) => ({
    requestId: request.headers.get('cf-ray') ?? crypto.randomUUID()
  })
});

type WorkerEnv = {
  OPENAI_API_KEY: string;
};

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext) {
    setRuntimeEnv({ openAiKey: env.OPENAI_API_KEY });
    return yoga.fetch(request, env, ctx);
  }
};
