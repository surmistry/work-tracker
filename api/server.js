const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const graphql = require('graphql')
const { Client } = require('pg')
const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    }
  })
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

const client = new Client({
  host: "localhost",
  user: "Suraj",
  database: "Suraj"
})
client.connect()

const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
