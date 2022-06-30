const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')
const { Client } = require('pg')
const joinMonster = require('join-monster')
const Exercise = require('./objects/exercise')

const client = new Client({
  host: "localhost",
  user: "Suraj",
  database: "Suraj"
})
client.connect()

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },
    exercise: {
      type: Exercise,
      args: { id: { type: graphql.GraphQLInt } },
      where: (exerciseTable, args, context) => {
        if (args.id) return `${exerciseTable}.id = ${args.id}`
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    exercises: {
      type: new graphql.GraphQLList(Exercise),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return Client.query(sql)
        })
      }
    } 
  })
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
