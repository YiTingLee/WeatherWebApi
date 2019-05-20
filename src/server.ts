import { resolvers } from './resolver/resolver';
import { WeatherModel } from './model/weather.model';
import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import('./db/db');
import('./collector/collector');

const typeDefs = importSchema(__dirname + '/schemas/schema.graphql');

const server = new GraphQLServer({ typeDefs, resolvers, context: { WeatherModel } });

server.start({
  port: 3000
}, () => console.log('Server is running on localhost:3000'));
