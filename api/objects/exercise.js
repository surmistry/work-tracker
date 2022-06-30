const graphql = require('graphql')

const Exercise = new graphql.GraphQLObjectType({
  name: 'Exercise',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
  })
});
    
Exercise._typeConfig = {
  sqlTable: 'exercise',
  uniqueKey: 'id',
}
module.exports=Exercise