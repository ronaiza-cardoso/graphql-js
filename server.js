const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

// GraphQL schema language
const schema = buildSchema (`
    type Query {
        hello: String
    }
`)

// The root provider a resolver function for each API endpoint
const root = {
    hello: () => {
        return `Hi Galaxy!`
    },
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
